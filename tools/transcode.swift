import Foundation
import AVFoundation

// usage: transcode in out width height videoBitrate
let a = CommandLine.arguments
let asset = AVURLAsset(url: URL(fileURLWithPath: a[1]))
let w = Int(a[3])!, hgt = Int(a[4])!, vbr = Int(a[5])!
let sem = DispatchSemaphore(value: 0)
nonisolated(unsafe) var keepAlive: [AnyObject] = []
Task {
  let vt = try await asset.loadTracks(withMediaType: .video).first!
  let at = try await asset.loadTracks(withMediaType: .audio).first
  let reader = try AVAssetReader(asset: asset)
  let vOut = AVAssetReaderTrackOutput(track: vt, outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange])
  reader.add(vOut)
  keepAlive.append(reader)
  var aOut: AVAssetReaderTrackOutput?
  if let at { aOut = AVAssetReaderTrackOutput(track: at, outputSettings: [AVFormatIDKey: kAudioFormatLinearPCM, AVLinearPCMBitDepthKey: 16, AVLinearPCMIsFloatKey: false, AVLinearPCMIsBigEndianKey: false, AVLinearPCMIsNonInterleaved: false]); reader.add(aOut!) }
  try? FileManager.default.removeItem(atPath: a[2])
  let writer = try AVAssetWriter(outputURL: URL(fileURLWithPath: a[2]), fileType: .mp4)
  writer.shouldOptimizeForNetworkUse = true
  keepAlive.append(writer)
  let vIn = AVAssetWriterInput(mediaType: .video, outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: w, AVVideoHeightKey: hgt,
    AVVideoScalingModeKey: AVVideoScalingModeResizeAspect,
    AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: vbr, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel, AVVideoMaxKeyFrameIntervalKey: 60]])
  vIn.transform = try await vt.load(.preferredTransform)
  writer.add(vIn)
  var aIn: AVAssetWriterInput?
  if at != nil {
    aIn = AVAssetWriterInput(mediaType: .audio, outputSettings: [AVFormatIDKey: kAudioFormatMPEG4AAC, AVNumberOfChannelsKey: 2, AVSampleRateKey: 44100, AVEncoderBitRateKey: 128000])
    writer.add(aIn!)
  }
  if !reader.startReading() { print("reader failed", reader.error?.localizedDescription ?? ""); exit(1) }
  writer.startWriting(); writer.startSession(atSourceTime: .zero)
  let group = DispatchGroup()
  func pump(_ input: AVAssetWriterInput, _ out: AVAssetReaderTrackOutput, _ q: String) {
    group.enter()
    input.requestMediaDataWhenReady(on: DispatchQueue(label: q)) {
      while input.isReadyForMoreMediaData {
        if let s = out.copyNextSampleBuffer() { input.append(s) } else { input.markAsFinished(); group.leave(); return }
      }
    }
  }
  pump(vIn, vOut, "v"); if let aIn, let aOut { pump(aIn, aOut, "a") }
  group.notify(queue: DispatchQueue.global()) { writer.finishWriting { print("done", writer.status.rawValue, writer.error?.localizedDescription ?? ""); sem.signal() } }
}
sem.wait()

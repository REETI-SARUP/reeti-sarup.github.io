import Foundation
import Vision
import AppKit
let root = CommandLine.arguments[1]
var out: [[String: Any]] = []
let en = FileManager.default.enumerator(atPath: root)!
var files: [String] = []
while let f = en.nextObject() as? String { if f.lowercased().hasSuffix(".png") { files.append(f) } }
files.sort()
for f in files {
  let url = URL(fileURLWithPath: root + "/" + f)
  guard let img = NSImage(contentsOf: url), let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { continue }
  let req = VNRecognizeTextRequest(); req.recognitionLevel = .accurate
  try? VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
  var lines: [[String: Any]] = []
  for o in (req.results ?? []) {
    guard let c = o.topCandidates(1).first else { continue }
    let b = o.boundingBox
    lines.append(["t": c.string, "x": b.minX, "y": 1 - b.maxY, "w": b.width, "h": b.height])
  }
  out.append(["file": f, "w": cg.width, "h": cg.height, "lines": lines])
}
let d = try! JSONSerialization.data(withJSONObject: out)
FileManager.default.createFile(atPath: CommandLine.arguments[2], contents: d)
print("done", out.count)

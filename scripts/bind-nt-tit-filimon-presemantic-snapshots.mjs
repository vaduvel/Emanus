#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const MAPS = {
  tit: {
    "tit-1-1-4":"sha256:15048c63ed4502370c8233808dcfa0375b2e04e24673652f21c0934ac1ca6e4b",
    "tit-1-5-9":"sha256:9c8f6d4784c32cd98b1105bfca0dc7b8e700ae7d609fe71b897b436bbc69f171",
    "tit-1-10-14":"sha256:0daefdd8ca572720cfbb0b8fc989979a98313c8f06857c5ca6b491e79dc320c2",
    "tit-1-15-16":"sha256:3ed8207409a195adcf895219b0a4cb2c5c5fc29be2908c999141e75d22430770",
    "tit-2-1-5":"sha256:fd6ebadba9a93c893eaf23f7a6fc01a39b39705c3bff7ad3f8a6f2dd8f78f587",
    "tit-2-6-10":"sha256:291abc939d2dcf5ac669293594ec797b6a2d2ab3a5f2044e417552f1eb020399",
    "tit-2-11-14":"sha256:fefe8058c7a1a2cc438d2ea7a8ff3381f01e2b542fbb0a0806b982cdcc3aaa2b",
    "tit-2-15-15":"sha256:063e1b7c683ec3160b918f10dda4c2a6ec77a94034cf42197264afd64d22b839",
    "tit-3-1-2":"sha256:8f87b004e4e2b41f86609f97b3fab60a8e0bfee55329a842d112eb051f3604b8",
    "tit-3-3-7":"sha256:e782794e4d2e778bfd08d127ebdd209ef9e88d4901cab8d2ed424ca17b38f2eb",
    "tit-3-8-11":"sha256:6e6db91b347779d6b74f090ab25a2f3bffc08ce57983eff7e047a0c149070e83",
    "tit-3-12-15":"sha256:15a7515313334e40842f284e25f3a30c6ddf5f5a64a39593717952eb6d434e7d"
  },
  filimon: {
    "filimon-1-1-3":"sha256:98748882f01879e07dcf00c2a17c139c237637b812b42f054d429e9b0ce23b1d",
    "filimon-1-4-7":"sha256:960dd82462736edc8117212be7f05fa0066f72b15238719208547d1b61a08290",
    "filimon-1-8-16":"sha256:aca74aa6e51adf066096ce1da23d95a9ac49f629df4177a1039c31ae3da4dce7",
    "filimon-1-17-22":"sha256:27719248fe98b8dec8cf584ad7b8a9cb06c14b137f09bc0b0635f3db6cf3bf20",
    "filimon-1-23-25":"sha256:32d3f503961aea60ed6926ee98492a4cd174ac6f77785409ba7f9fbd7a8c60ab"
  }
}
const FILES = { tit:"17-tit.json", filimon:"18-filimon.json" }
const fail = message => { console.error(`[Tit/Filimon snapshot binding] ${message}`); process.exit(1) }

for (const [bookId,map] of Object.entries(MAPS)) {
  const file = path.join(ROOT,"docs/data/biblia-explicata/nt-semantic-review-spec",FILES[bookId])
  if (!fs.existsSync(file)) fail(`${bookId}: missing spec`)
  const spec = JSON.parse(fs.readFileSync(file,"utf8"))
  if (spec.schema !== "emanus-manual-review-spec-v2" || spec.bookId !== bookId || !spec.decisions) fail(`${bookId}: unexpected spec schema`)
  const ids = Object.keys(spec.decisions)
  if (ids.length !== Object.keys(map).length || ids.some(id => !map[id])) fail(`${bookId}: reviewed unit set drifted`)
  let changed=0
  for (const id of ids) {
    const expected=map[id]
    if (spec.decisions[id].expectedCurrentSnapshotSha256 !== expected) {
      spec.decisions[id].expectedCurrentSnapshotSha256=expected
      changed++
    }
  }
  fs.writeFileSync(file,JSON.stringify(spec,null,2)+"\n","utf8")
  console.log(`${bookId}: bound ${ids.length} review decisions to deterministic pre-semantic snapshots (${changed} fields updated).`)
}

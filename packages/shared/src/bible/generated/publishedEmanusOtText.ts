// GENERATED FILE. Source of truth: docs/data/biblia-emanus/*.json
// Textul este împărțit per carte pentru chunking PWA sub limita Workbox.
import { EMANUS_TEXT_BOOK as book01 } from "./publishedEmanusOtText/geneza.js"
import { EMANUS_TEXT_BOOK as book02 } from "./publishedEmanusOtText/exod.js"
import { EMANUS_TEXT_BOOK as book03 } from "./publishedEmanusOtText/levitic.js"
import { EMANUS_TEXT_BOOK as book04 } from "./publishedEmanusOtText/numeri.js"
import { EMANUS_TEXT_BOOK as book05 } from "./publishedEmanusOtText/deuteronom.js"
import { EMANUS_TEXT_BOOK as book06 } from "./publishedEmanusOtText/iosua.js"
import { EMANUS_TEXT_BOOK as book07 } from "./publishedEmanusOtText/judecatori.js"
import { EMANUS_TEXT_BOOK as book08 } from "./publishedEmanusOtText/rut.js"
import { EMANUS_TEXT_BOOK as book09 } from "./publishedEmanusOtText/samuel1.js"
import { EMANUS_TEXT_BOOK as book10 } from "./publishedEmanusOtText/samuel2.js"
import { EMANUS_TEXT_BOOK as book11 } from "./publishedEmanusOtText/imparati1.js"
import { EMANUS_TEXT_BOOK as book12 } from "./publishedEmanusOtText/imparati2.js"
import { EMANUS_TEXT_BOOK as book13 } from "./publishedEmanusOtText/cronici1.js"
import { EMANUS_TEXT_BOOK as book14 } from "./publishedEmanusOtText/cronici2.js"
import { EMANUS_TEXT_BOOK as book15 } from "./publishedEmanusOtText/ezra.js"
import { EMANUS_TEXT_BOOK as book16 } from "./publishedEmanusOtText/neemia.js"
import { EMANUS_TEXT_BOOK as book17 } from "./publishedEmanusOtText/estera.js"
import { EMANUS_TEXT_BOOK as book18 } from "./publishedEmanusOtText/iov.js"
import { EMANUS_TEXT_BOOK as book19 } from "./publishedEmanusOtText/psalmi.js"
import { EMANUS_TEXT_BOOK as book20 } from "./publishedEmanusOtText/proverbe.js"
import { EMANUS_TEXT_BOOK as book21 } from "./publishedEmanusOtText/eclesiastul.js"
import { EMANUS_TEXT_BOOK as book22 } from "./publishedEmanusOtText/cantareaCantarilor.js"
import { EMANUS_TEXT_BOOK as book23 } from "./publishedEmanusOtText/isaia.js"
import { EMANUS_TEXT_BOOK as book24 } from "./publishedEmanusOtText/ieremia.js"
import { EMANUS_TEXT_BOOK as book25 } from "./publishedEmanusOtText/plangerile.js"
import { EMANUS_TEXT_BOOK as book26 } from "./publishedEmanusOtText/ezechiel.js"
import { EMANUS_TEXT_BOOK as book27 } from "./publishedEmanusOtText/daniel.js"
import { EMANUS_TEXT_BOOK as book28 } from "./publishedEmanusOtText/osea.js"
import { EMANUS_TEXT_BOOK as book29 } from "./publishedEmanusOtText/ioel.js"
import { EMANUS_TEXT_BOOK as book30 } from "./publishedEmanusOtText/amos.js"
import { EMANUS_TEXT_BOOK as book31 } from "./publishedEmanusOtText/obadia.js"
import { EMANUS_TEXT_BOOK as book32 } from "./publishedEmanusOtText/iona.js"
import { EMANUS_TEXT_BOOK as book33 } from "./publishedEmanusOtText/mica.js"
import { EMANUS_TEXT_BOOK as book34 } from "./publishedEmanusOtText/naum.js"
import { EMANUS_TEXT_BOOK as book35 } from "./publishedEmanusOtText/habacuc.js"
import { EMANUS_TEXT_BOOK as book36 } from "./publishedEmanusOtText/tefania.js"
import { EMANUS_TEXT_BOOK as book37 } from "./publishedEmanusOtText/hagai.js"
import { EMANUS_TEXT_BOOK as book38 } from "./publishedEmanusOtText/zaharia.js"
import { EMANUS_TEXT_BOOK as book39 } from "./publishedEmanusOtText/maleahi.js"

export interface PublishedEmanusOtTextBook {
  order: number
  code: string
  name: string
  chapters: Readonly<Record<number, readonly string[]>>
}

export const PUBLISHED_EMANUS_OT_BOOK_COUNT = 39 as const
export const PUBLISHED_EMANUS_OT_CHAPTER_COUNT = 929 as const
export const PUBLISHED_EMANUS_OT_VERSE_COUNT = 23145 as const

export const PUBLISHED_EMANUS_OT_TEXT_BY_ORDER: ReadonlyMap<number, PublishedEmanusOtTextBook> = new Map<number, PublishedEmanusOtTextBook>([
  [1, book01],
  [2, book02],
  [3, book03],
  [4, book04],
  [5, book05],
  [6, book06],
  [7, book07],
  [8, book08],
  [9, book09],
  [10, book10],
  [11, book11],
  [12, book12],
  [13, book13],
  [14, book14],
  [15, book15],
  [16, book16],
  [17, book17],
  [18, book18],
  [19, book19],
  [20, book20],
  [21, book21],
  [22, book22],
  [23, book23],
  [24, book24],
  [25, book25],
  [26, book26],
  [27, book27],
  [28, book28],
  [29, book29],
  [30, book30],
  [31, book31],
  [32, book32],
  [33, book33],
  [34, book34],
  [35, book35],
  [36, book36],
  [37, book37],
  [38, book38],
  [39, book39],
])

/**
 * ZENTRALE INHALTSDATEI
 * --------------------
 * Hier kannst du Logo, Video, Kontaktdaten, Pakete und Menüeinträge ändern,
 * ohne HTML oder CSS anzufassen.
 */
window.HARAYAKI_CONTENT = {
  brand: {
    logoLight: "assets/images/logo-light.png",
    logoDark: "assets/images/logo-dark.png",
    heroVideo: "assets/videos/hero.mp4",
    heroVideoMobile: "assets/videos/hero-mobile.mp4",
    heroPoster: "assets/images/hero-poster.jpg",
    email: "hello@harayaki.de",
    phone: "+49 000 000000",

    // Optional: Formspree-, Basin- oder eigener API-Endpunkt.
    // Leer lassen = Anfrage wird als vorbereitete E-Mail geöffnet.
    formEndpoint: ""
  },

  packages: [
    {
      id: "coffee-bike-s",
      size: "S",
      badge: "Kompakt",
      title: "Coffee Bike S",
      image: "assets/images/package-bike.jpg",
      teaser: "Der agile Begleiter für Messen und kompakte Locations. Maximale Wirkung bei minimalem Platzbedarf.",
      highlights: [
        "Ideal für Messen & Showrooms",
        "Geringer Platzbedarf",
        "Schneller Auf- und Abbau"
      ],
      description: "Das Coffee Bike S ist die flexible Lösung für kleinere Flächen, Pop-ups, Showrooms und Messestände. Der kompakte Aufbau bringt professionellen Barista-Service dorthin, wo jeder Quadratmeter zählt.",
      specifications: [
        ["Empfohlene Gästezahl", "bis ca. 150 Personen"],
        ["Platzbedarf", "ca. 2,5 × 2,0 m"],
        ["Aufbauzeit", "ca. 30 Minuten"],
        ["Strom", "230 V / 16 A"],
        ["Service", "1–2 Baristas"],
        ["Menüumfang", "Coffee Classics & ausgewählte Signature Drinks"]
      ],
      included: [
        "Anlieferung, Aufbau und Abbau",
        "ROCKET-Siebträgermaschine",
        "Professioneller Barista-Service",
        "Becher, Verbrauchsmaterial und Grundausstattung",
        "Individuelle Menüabstimmung"
      ]
    },
    {
      id: "coffee-truck-m",
      size: "M",
      badge: "Standard – beliebt",
      title: "Coffee Truck M",
      image: "assets/images/package-truck.jpg",
      teaser: "Unser charakteristischer Cart – ein echter Blickfang für Festivals, Stadtfeste und Events.",
      highlights: [
        "Ideal für Festivals & Stadtfeste",
        "Hot & Iced Drinks",
        "Japanese Street Food"
      ],
      description: "Der Coffee Truck M verbindet einen markanten Markenauftritt mit hoher Serviceleistung. Er eignet sich für Events mit mittlerem bis hohem Gästeaufkommen und kann Kaffee, Iced Drinks sowie ausgewählte Food-Angebote abbilden.",
      specifications: [
        ["Empfohlene Gästezahl", "ca. 150–500 Personen"],
        ["Platzbedarf", "ca. 4,0 × 3,0 m"],
        ["Aufbauzeit", "ca. 60 Minuten"],
        ["Strom", "230 V / 16 A"],
        ["Service", "2–3 Baristas"],
        ["Menüumfang", "Hot & Iced Drinks, Street-Food-Optionen"]
      ],
      included: [
        "Anlieferung, Aufbau und Abbau",
        "Kompletter Coffee-Truck-Auftritt",
        "ROCKET-Siebträgermaschine",
        "Professionelles Service-Team",
        "Optionale Individualisierung für Marken und Events"
      ]
    },
    {
      id: "coffee-bus-l",
      size: "L",
      badge: "Premium",
      title: "Coffee Bus L",
      image: "assets/images/package-bus.jpg",
      teaser: "Unser Retro-Renault-Bus – Vintage-Charme trifft auf professionellen Barista-Service.",
      highlights: [
        "Ideal für Festivals & Open-Air-Events",
        "Einzigartiger Auftritt",
        "Volles HARAYAKI-Menü"
      ],
      description: "Der Coffee Bus L ist das Premium-Format für große Veranstaltungen und aufmerksamkeitsstarke Markeninszenierungen. Der Retro-Bus wird zum zentralen Treffpunkt und ermöglicht das volle HARAYAKI-Angebot.",
      specifications: [
        ["Empfohlene Gästezahl", "ab ca. 300 Personen"],
        ["Platzbedarf", "ca. 7,0 × 4,0 m"],
        ["Aufbauzeit", "ca. 90 Minuten"],
        ["Strom", "nach Eventkonzept"],
        ["Service", "3–5 Teammitglieder"],
        ["Menüumfang", "Volles Coffee-, Drink- und Street-Food-Angebot"]
      ],
      included: [
        "Anlieferung und vollständiger Eventaufbau",
        "Retro-Bus als aufmerksamkeitsstarker Blickfang",
        "Mehrere Service-Stationen möglich",
        "Individuelles Branding nach Absprache",
        "Komplette operative Betreuung"
      ]
    },
    {
      id: "catering-zelt-xl",
      size: "XL",
      badge: "Individual",
      title: "Catering-Zelt",
      image: "assets/images/package-tent.jpg",
      teaser: "Maßgeschneiderte Catering-Lösungen für Firmenevents, Jubiläen und besondere Anlässe.",
      highlights: [
        "Firmenevents & Jubiläen",
        "Privates Catering",
        "Auf Anfrage"
      ],
      description: "Das Catering-Zelt wird passend zur Veranstaltung geplant. Fläche, Personal, Menü und Branding lassen sich flexibel kombinieren – vom kompakten Corporate-Setup bis zur vollwertigen Eventfläche.",
      specifications: [
        ["Empfohlene Gästezahl", "individuell"],
        ["Platzbedarf", "ab ca. 3,0 × 3,0 m"],
        ["Aufbauzeit", "abhängig vom Konzept"],
        ["Strom", "abhängig vom Leistungsumfang"],
        ["Service", "individuelle Teamgröße"],
        ["Menüumfang", "frei konfigurierbar"]
      ],
      included: [
        "Individuelle Konzeptentwicklung",
        "Flexible Zelt- und Thekenmodule",
        "Coffee, Drinks und Food kombinierbar",
        "Branding- und Dekorationsoptionen",
        "Persönliche Projektbetreuung"
      ]
    }
  ],

  menu: {
    intro: "Beispielhafte Menükarte. Produkte, Preise und Verfügbarkeit können in js/content.js angepasst werden.",
    categories: [
      {
        title: "Kaffee",
        items: [
          { name: "Espresso", price: "2,50 €", note: "" },
          { name: "Americano", price: "2,80 €", note: "" },
          { name: "Cappuccino", price: "3,20 €", note: "" },
          { name: "Latte Macchiato", price: "3,50 €", note: "" },
          { name: "Flat White", price: "3,50 €", note: "" },
          { name: "Iced Latte", price: "3,80 €", note: "" }
        ]
      },
      {
        title: "Signature Drinks",
        items: [
          { name: "Harayaki Matcha Latte", price: "4,20 €", note: "hot / iced" },
          { name: "Yuzu Espresso Tonic", price: "4,50 €", note: "iced" },
          { name: "Black Sesame Latte", price: "4,20 €", note: "" },
          { name: "Hojicha Latte", price: "4,20 €", note: "" }
        ]
      },
      {
        title: "Japanese Street Food",
        items: [
          { name: "Takoyaki", price: "6,50 €", note: "6 Stück" },
          { name: "Gyoza", price: "6,50 €", note: "5 Stück" },
          { name: "Karaage Chicken", price: "6,90 €", note: "" },
          { name: "Onigiri", price: "4,50 €", note: "wechselnde Sorten" }
        ]
      },
      {
        title: "Extras",
        items: [
          { name: "Hafermilch", price: "+0,50 €", note: "" },
          { name: "Vanille / Karamell", price: "+0,50 €", note: "" },
          { name: "Extra Shot", price: "+0,80 €", note: "" }
        ]
      }
    ]
  }
};

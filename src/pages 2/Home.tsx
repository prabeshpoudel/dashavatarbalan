import { useMemo, useState } from "react";
import { Link } from "react-router-dom";


export default function Home() {
  const [selectedAvatar, setSelectedAvatar] = useState<any | null>(null);
  const [selectedGod, setSelectedGod] = useState<any | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [showSupport, setShowSupport] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const avatars = [
    {
      name: "Matsya",
      titleNp: "मत्स्य",
      desc: "The fish incarnation who protected sacred knowledge and guided life through cosmic flood.",
      color: "from-orange-100 to-amber-50",
      icon: "🐟",
      details:
        "Matsya is the first avatar of Lord Vishnu. He appeared in the form of a great fish to protect sacred knowledge, guide King Manu during the cosmic flood, and preserve life for a new beginning.",
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Vishnu_in_the_form_of_a_fish_Wellcome_V0046243.jpg/1280px-Vishnu_in_the_form_of_a_fish_Wellcome_V0046243.jpg",
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Kurma",
      titleNp: "कूर्म",
      desc: "The tortoise incarnation symbolizing support, balance, and divine stability.",
      color: "from-amber-100 to-yellow-50",
      icon: "🐢",
      details:
        "Kurma, the tortoise avatar, supported Mount Mandara during the Samudra Manthan. This form represents patience, foundation, and the unseen divine strength that supports cosmic balance.",
      images: [
        "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Varaha",
      titleNp: "वराह",
      desc: "The boar incarnation who lifted the earth, representing protection and strength.",
      color: "from-red-100 to-orange-50",
      icon: "🐗",
      details:
        "Varaha rescued Mother Earth from the depths after the demon Hiranyaksha dragged her into the cosmic waters. This avatar stands for courage, rescue, and divine protection.",
      images: [
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Narasimha",
      titleNp: "नरसिंह",
      desc: "The fierce protector who defeats evil and safeguards devotion.",
      color: "from-yellow-100 to-orange-50",
      icon: "🦁",
      details:
        "Narasimha, the half-man and half-lion form of Vishnu, appeared to protect Prahlad and destroy Hiranyakashipu. He represents fearless protection of truth and devotion.",
      images: [
        "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1552410260-0fd9b577afa6?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Vamana",
      titleNp: "वामन",
      desc: "The humble dwarf incarnation teaching that divine power can appear in simple forms.",
      color: "from-orange-100 to-red-50",
      icon: "🕉️",
      details:
        "Vamana came as a humble Brahmin boy and asked King Bali for three steps of land. With those three steps, he covered the universe, teaching humility, wisdom, and divine majesty.",
      images: [
        "https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Parashurama",
      titleNp: "परशुराम",
      desc: "The warrior sage who stood for justice and discipline.",
      color: "from-amber-100 to-stone-50",
      icon: "🪓",
      details:
        "Parashurama is the warrior sage avatar known for carrying an axe and standing firmly against injustice. He symbolizes discipline, righteous anger, and duty.",
      images: [
        "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Rama",
      titleNp: "राम",
      desc: "The ideal king and symbol of dharma, truth, and noble duty.",
      color: "from-rose-100 to-orange-50",
      icon: "🏹",
      details:
        "Lord Rama, the hero of the Ramayana, is revered as the ideal king, son, husband, and protector of dharma. His life reflects duty, honor, sacrifice, and devotion.",
      images: [
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Krishna",
      titleNp: "कृष्ण",
      desc: "The divine guide of love, wisdom, devotion, and the Bhagavad Gita.",
      color: "from-blue-100 to-indigo-50",
      icon: "🪈",
      details:
        "Krishna is the avatar of divine love, playfulness, and deep wisdom. He guided Arjuna through the Bhagavad Gita and continues to inspire devotion, joy, and spiritual understanding.",
      images: [
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Buddha",
      titleNp: "बुद्ध",
      desc: "The incarnation of compassion, peace, and awakened understanding.",
      color: "from-lime-100 to-green-50",
      icon: "☸️",
      details:
        "In many traditions, Buddha is counted among the Dashavatar as an embodiment of compassion, peace, and awakened understanding. This form highlights mercy and inner realization.",
      images: [
        "https://images.unsplash.com/photo-1601758123927-1961e8cbe8c9?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Kalki",
      titleNp: "कल्कि",
      desc: "The future incarnation who restores righteousness and cosmic order.",
      color: "from-zinc-100 to-slate-50",
      icon: "🐎",
      details:
        "Kalki is believed to be the future avatar of Vishnu who will appear at the end of Kali Yuga to remove darkness and restore righteousness, balance, and truth.",
      images: [
        "https://images.unsplash.com/photo-1501706362039-c6e13b4f69f3?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
      ],
    },
  ];

  const gods = [
    {
      name: "Shiva",
      titleNp: "शिव",
      desc: "Lord of transformation, meditation, and cosmic balance.",
      details:
        "Lord Shiva represents transformation, meditation, destruction of ego, and cosmic balance. He is worshipped as Mahadev, the great god, and is deeply connected to spiritual power and inner silence.",
      images: [
        "https://images.unsplash.com/photo-1542042161784-26ab9e041e89?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1567591375036-fd6dd0f7e9dd?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Brahma",
      titleNp: "ब्रह्मा",
      desc: "The creator who represents the beginning of existence and sacred knowledge.",
      details:
        "Brahma is known as the creator in the Hindu trinity. He symbolizes creation, cosmic origin, sacred order, and the unfolding of knowledge.",
      images: [
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Ganesh",
      titleNp: "गणेश",
      desc: "Remover of obstacles and patron of wisdom, beginnings, and learning.",
      details:
        "Lord Ganesh is worshipped before new beginnings and sacred work. He is known as the remover of obstacles, giver of wisdom, and beloved symbol of intelligence and auspiciousness.",
      images: [
        "https://scontent.fmel14-1.fna.fbcdn.net/v/t39.30808-6/641457149_1532991341099803_39222114518402421_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=FEgDYaU8cKgQ7kNvwFkMh9A&_nc_oc=AdnTGlbn-ZXiHrizkQ4gn4BaHHDXxcUaYoj4k2uOxKdsKJ4vGXc6VaqDx_uUYo8ZOj8&_nc_zt=23&_nc_ht=scontent.fmel14-1.fna&_nc_gid=NuM1it1Tzxrgww_VMx1kaA&_nc_ss=8&oh=00_Afz-VYyxe4aq1VdFaGEOyh11By7fMoi_LWui3uYWld2kKA&oe=69B97045",
        "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Parvati",
      titleNp: "पार्वती",
      desc: "Motherly divine energy representing love, power, and devotion.",
      details:
        "Parvati is the goddess of love, strength, family, and devotion. She is revered as the divine mother and as a source of compassion and Shakti.",
      images: [
        "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Lakshmi",
      titleNp: "लक्ष्मी",
      desc: "Goddess of prosperity, abundance, beauty, and auspiciousness.",
      details:
        "Goddess Lakshmi is worshipped for prosperity, abundance, beauty, purity, and blessings in the home. She is an important symbol of well-being and grace.",
      images: [
        "https://images.unsplash.com/photo-1605514449459-5a9f6b6f1c3b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80",
      ],
    },
    {
      name: "Saraswati",
      titleNp: "सरस्वती",
      desc: "Goddess of learning, music, language, and the arts.",
      details:
        "Goddess Saraswati represents wisdom, education, music, speech, and creativity. She is worshipped by students, artists, and seekers of knowledge.",
      images: [
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      ],
    },
  ];

  const highlights = [
    "10+ Years of Cultural Service",
    "Dashavatar Balan Performances",
    "Public Hindu Education Events",
    "Temple & Park Development in Rampur",
  ];

  const events = [
    {
      title: "Dashavatar Balan Program",
      place: "Rampur, Palpa",
      desc: "Traditional stage performance sharing the spiritual meaning of Vishnu’s ten avatars.",
      time: "Sunday, 10 AM - 2 PM",
      address: "Rampur Community Hall, Palpa, Nepal",
      details: "Join us for an immersive performance of the Dashavatar stories, featuring traditional music, dance, and narration. Free entry, donations appreciated.",
      inquiryPhone: "+9779857060970",
    },
    {
      title: "Hindu Knowledge Outreach",
      place: "Different Public Venues",
      desc: "Religious awareness events introducing Shiva, Brahma, Ganesh, Parvati, Lakshmi, and more.",
      time: "Various dates, 6 PM - 8 PM",
      address: "Public venues across Palpa district",
      details: "Educational sessions on Hindu deities, mythology, and cultural practices. Open to all ages, interactive Q&A included.",
      inquiryPhone: "9771234567890",
    },
    {
      title: "Temple & Park Community Campaign",
      place: "Rampur, Nepal",
      desc: "Public support and community-building effort for the upcoming temple and cultural park.",
      time: "Ongoing, contact for schedules",
      address: "Rampur Development Site, Palpa, Nepal",
      details: "Community meetings and fundraising events for the temple and park project. Volunteer opportunities available.",
      inquiryPhone: "9771234567890",
    },
  ];

  const nav = ["Home", "About", "Dashavatar", "Gods", "Events", "Temple Project", "Gallery", "Blog", "Contact"];

  const activeDetail = useMemo(() => selectedAvatar || selectedGod || selectedEvent, [selectedAvatar, selectedGod, selectedEvent]);

  const closeDetail = () => {
    setSelectedAvatar(null);
    setSelectedGod(null);
    setSelectedEvent(null);
  };

  return (
    <>
      {activeDetail && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
            <button
              onClick={closeDetail}
              className="absolute right-4 top-4 z-10 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              Close
            </button>
            <div className="grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
              {activeDetail.images ? (
                <>
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700">
                        {activeDetail.titleNp}
                      </span>
                      <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-stone-700">
                        Detailed Information
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-stone-900 sm:text-4xl">{activeDetail.name}</h3>
                    <p className="mt-4 text-base leading-8 text-stone-700">{activeDetail.details}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {activeDetail.images.map((img: string, index: number) => (
                      <div key={`${activeDetail.name}-${index}`} className="overflow-hidden rounded-[1.5rem] border border-amber-200 bg-amber-50 shadow-sm">
                        <img src={img} alt={`${activeDetail.name} visual ${index + 1}`} className="h-56 w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-700">
                        {activeDetail.place}
                      </span>
                      <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-stone-700">
                        Event Details
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-stone-900 sm:text-4xl">{activeDetail.title}</h3>
                    <p className="mt-4 text-base leading-8 text-stone-700"><strong>Time:</strong> {activeDetail.time}</p>
                    <p className="mt-2 text-base leading-8 text-stone-700"><strong>Address:</strong> {activeDetail.address}</p>
                    <p className="mt-4 text-base leading-8 text-stone-700">{activeDetail.details}</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <a
                      href={`https://wa.me/${activeDetail.inquiryPhone}?text=Inquiry about ${activeDetail.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-700"
                    >
                      Inquiry via WhatsApp
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showSupport && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
            <button
              onClick={() => setShowSupport(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              Close
            </button>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-stone-900 mb-4">Support Our Project</h3>
              <div className="flex justify-center mb-4">
                <img src="https://via.placeholder.com/300x300.png?text=Scan+to+Donate" alt="QR Code for donation" className="w-48 h-48 rounded-lg" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-stone-700"><strong>Bank Name:</strong> Global IME Bank</p>
                <p className="text-sm text-stone-700"><strong>Account Name:</strong> Dharmodaya Dashavatar Balan Samuh</p>
                <p className="text-sm text-stone-700"><strong>Account Number:</strong> 1234567890</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-amber-50 text-stone-800">
        <header className="sticky top-0 z-40 border-b border-amber-200/70 bg-amber-50/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-700">Rampur, Palpa, Nepal</p>
              <h1 className="text-lg font-bold text-stone-900 sm:text-xl">धर्मोदय दशावतार बालन समूह</h1>
            </div>
            <nav className="hidden gap-6 md:flex">
              {nav.map((item) => (
                item === "Blog" ? (
                  <Link key={item} to="/blog" className="text-sm font-medium text-stone-700 transition hover:text-orange-700">
                    {item}
                  </Link>
                ) : (
                  <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm font-medium text-stone-700 transition hover:text-orange-700">
                    {item}
                  </a>
                )
              ))}
            </nav>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                <div className="flex flex-col space-y-1">
                  <div className="w-6 h-0.5 bg-stone-700"></div>
                  <div className="w-6 h-0.5 bg-stone-700"></div>
                  <div className="w-6 h-0.5 bg-stone-700"></div>
                </div>
              </button>
            </div>
            <button onClick={() => setShowSupport(true)} className="rounded-full bg-orange-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-800">
              Support Project
            </button>
          </div>
        </header>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden">
            <div className="fixed top-0 left-0 w-full bg-amber-50 p-4 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-700">Rampur, Palpa, Nepal</p>
                  <h1 className="text-lg font-bold text-stone-900">धर्मोदय दशावतार बालन समूह</h1>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-stone-700 text-xl">✕</button>
              </div>
              <nav className="flex flex-col space-y-4">
                {nav.map((item) => (
                  item === "Blog" ? (
                    <Link key={item} to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-stone-700 transition hover:text-orange-700 py-2 border-b border-amber-200 last:border-b-0">
                      {item}
                    </Link>
                  ) : (
                    <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-stone-700 transition hover:text-orange-700 py-2 border-b border-amber-200 last:border-b-0">
                      {item}
                    </a>
                  )
                ))}
              </nav>
            </div>
          </div>
        )}

        <section id="home" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(180,83,9,0.12),_transparent_30%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-flex w-fit items-center rounded-full border border-orange-300 bg-white/70 px-4 py-1 text-sm font-medium text-orange-800">
                Preserving Hindu Culture for More Than 10 Years
              </span>
              <h2 className="max-w-2xl text-4xl font-black leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
                परित्राणाय साधूनां विनाशाय  <span className="text-orange-700">च दुष्कृताम् ।</span>,धर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">
                Based in Rampur, Palpa, this cultural organization shares the stories of Lord Vishnu’s ten avatars,
                spreads knowledge about major Hindu deities, performs traditional jhaki and balan programs, and is now
                building a temple and public park for future generations.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#dashavatar" className="rounded-full bg-orange-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-800">
                  Explore Dashavatar
                </a>
                <a href="#temple-project" className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-orange-400 hover:text-orange-700">
                  Temple & Park Vision
                </a>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-amber-200 bg-white/80 p-4 shadow-sm">
                    <p className="font-semibold text-stone-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-8 hidden h-24 w-24 rounded-full bg-orange-300/30 blur-2xl sm:block" />
              <div className="absolute -bottom-10 right-8 hidden h-28 w-28 rounded-full bg-yellow-300/40 blur-2xl sm:block" />
              <div className="relative overflow-hidden rounded-[2rem] border border-orange-200 bg-gradient-to-br from-orange-100 via-amber-50 to-white p-6 shadow-2xl">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-6 shadow-sm sm:col-span-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">Mission</p>
                    <h3 className="mt-3 text-2xl font-bold text-stone-900">Protect culture, educate the public, and serve the community.</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-700">
                      This website is designed as a digital cultural center where visitors can learn about Dashavatar,
                      understand important Hindu gods, explore public events, and follow the temple and park project.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-orange-100 bg-orange-50 p-6">
                    <p className="text-4xl">🎭</p>
                    <h4 className="mt-3 text-lg font-bold">Balan & Jhaki</h4>
                    <p className="mt-2 text-sm leading-7 text-stone-700">Traditional dramatic storytelling rooted in faith and community memory.</p>
                  </div>
                  <div className="rounded-3xl border border-orange-100 bg-amber-50 p-6">
                    <p className="text-4xl">🛕</p>
                    <h4 className="mt-3 text-lg font-bold">Temple & Park</h4>
                    <p className="mt-2 text-sm leading-7 text-stone-700">A new spiritual and public space for worship, learning, and gathering.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-700">About the organization</p>
              <h3 className="mt-3 text-3xl font-black text-stone-900 sm:text-4xl">A cultural movement rooted in devotion and public education.</h3>
              <p className="mt-6 text-base leading-8 text-stone-700">
                धर्मोदय दशावतार बालन समूह is envisioned here as a heritage-focused organization dedicated to sharing the
                sacred stories of Lord Vishnu’s ten avatars, introducing the public to major Hindu deities, and keeping
                traditional performance culture alive through events, jhaki, and devotional drama.
              </p>
              <p className="mt-4 text-base leading-8 text-stone-700">
                The website should reflect both spiritual depth and local community pride, especially the group’s long-term
                role in Rampur, Palpa, and its future vision of building a temple and park for the public.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Vision", "To build a lasting spiritual and cultural center for future generations."],
                ["Mission", "To preserve Hindu tradition through performance, education, and service."],
                ["Values", "Faith, discipline, culture, heritage, devotion, and public benefit."],
                ["Audience", "Devotees, youth, families, visitors, supporters, and the broader public."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
                  <h4 className="text-lg font-bold text-stone-900">{title}</h4>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="dashavatar" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-700">Dashavatar</p>
              <h3 className="mt-3 text-3xl font-black text-stone-900 sm:text-4xl">The ten avatars of Lord Vishnu</h3>
              <p className="mt-5 text-base leading-8 text-stone-700">
                This section introduces the main incarnations of Vishnu and acts as the educational heart of the site.
                Each avatar can later expand into a dedicated page with mythology, symbolism, and its role in balan performance.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {avatars.map((avatar) => (
                <div key={avatar.name} className={`rounded-[1.75rem] border border-amber-100 bg-gradient-to-br ${avatar.color} p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl`}>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{avatar.icon}</span>
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-orange-700">{avatar.titleNp}</span>
                  </div>
                  <h4 className="mt-5 text-xl font-bold text-stone-900">{avatar.name}</h4>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{avatar.desc}</p>
                  <button
                    onClick={() => setSelectedAvatar(avatar)}
                    className="mt-5 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-stone-900 transition hover:bg-white"
                  >
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gods" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-700">Knowledge center</p>
              <h3 className="mt-3 text-3xl font-black text-stone-900 sm:text-4xl">A dedicated space to understand major Hindu gods</h3>
              <p className="mt-5 text-base leading-8 text-stone-700">
                Alongside Dashavatar, the website should include an educational field for Shiva, Brahma, Ganesh,
                Parvati, Lakshmi, and other major deities. This helps the site serve not only as an event platform,
                but also as a spiritual learning resource for the public.
              </p>
              <div className="mt-8 rounded-[1.75rem] border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-100 p-6 shadow-sm">
                <h4 className="text-xl font-bold text-stone-900">Content idea</h4>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  Each deity profile can include meaning, symbolism, family relations, role in Hindu belief, important
                  festivals, iconography, and its connection to community worship and temple traditions.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gods.map((god) => (
                <div key={god.name} className="rounded-[1.5rem] border border-amber-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">{god.titleNp}</p>
                  <h4 className="mt-2 text-xl font-bold text-stone-900">{god.name}</h4>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{god.desc}</p>
                  <button
                    onClick={() => setSelectedGod(god)}
                    className="mt-4 text-sm font-semibold text-orange-700 hover:text-orange-800"
                  >
                    View Profile →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="events" className="bg-stone-900 py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">Events & public programs</p>
              <h3 className="mt-3 text-3xl font-black sm:text-4xl">Taking sacred stories to the people</h3>
              <p className="mt-5 text-base leading-8 text-stone-300">
                The organization can use this section to display ongoing and past programs held in different places,
                showing how Dashavatar Balan and Hindu knowledge are shared beyond a single location.
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {events.map((event) => (
                <div key={event.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">{event.place}</p>
                  <h4 className="mt-3 text-2xl font-bold">{event.title}</h4>
                  <p className="mt-4 text-sm leading-7 text-stone-300">{event.desc}</p>
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="mt-5 rounded-full border border-orange-300 px-4 py-2 text-sm font-semibold text-orange-200 transition hover:bg-orange-500/10"
                  >
                    Event Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="temple-project" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] bg-gradient-to-br from-orange-700 to-amber-600 p-8 text-white shadow-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-100">Temple & park project</p>
              <h3 className="mt-3 text-3xl font-black sm:text-4xl">A spiritual home for worship, culture, and public life</h3>
              <p className="mt-5 text-base leading-8 text-orange-50">
                One of the most important parts of the website should be the future-facing project section: a temple and
                public park in Rampur, designed for devotion, community gatherings, cultural performances, and a peaceful
                spiritual environment for visitors.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Temple premises",
                  "Public park",
                  "Community space",
                  "Cultural stage",
                  "Festival celebrations",
                ].map((item) => (
                  <span key={item} className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-orange-800 transition hover:bg-orange-50"
              >
                View 3D Temple Design
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Why it matters", "It gives the organization a permanent public identity and creates a place where faith, education, and community can meet."],
                ["For the public", "The temple and park can become a welcoming space for worship, learning, festivals, and quiet reflection."],
                ["For culture", "It ensures that balan, jhaki, and Hindu storytelling continue with dignity in a dedicated environment."],
                ["For the future", "The project can inspire youth to connect with heritage while also strengthening local pride in Rampur, Palpa."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[1.5rem] border border-amber-200 bg-white p-6 shadow-sm">
                  <h4 className="text-lg font-bold text-stone-900">{title}</h4>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

<GallerySection />

        <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-700">Contact & support</p>
              <h3 className="mt-3 text-3xl font-black text-stone-900 sm:text-4xl">Connect with the organization</h3>
              <p className="mt-5 text-base leading-8 text-stone-700">
                This final section can include phone numbers, email, address, social links, donation details, and public
                inquiry options. It should be easy for devotees, supporters, and event organizers to reach the group.
              </p>
              <div className="mt-8 space-y-4 text-sm leading-7 text-stone-700">
                <p><span className="font-semibold text-stone-900">Location:</span> Rampur, Palpa, Nepal</p>
                <p><span className="font-semibold text-stone-900">Focus:</span> Dashavatar Balan, Hindu education, temple & park project</p>
                <p><span className="font-semibold text-stone-900">Suggested extras:</span> Facebook integration, donation QR, Google Map, volunteer form</p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-xl">
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="rounded-2xl border border-amber-200 bg-white px-4 py-3 outline-none placeholder:text-stone-400 focus:border-orange-400" placeholder="Your name" />
                <input className="rounded-2xl border border-amber-200 bg-white px-4 py-3 outline-none placeholder:text-stone-400 focus:border-orange-400" placeholder="Phone or email" />
                <input className="rounded-2xl border border-amber-200 bg-white px-4 py-3 outline-none placeholder:text-stone-400 focus:border-orange-400 sm:col-span-2" placeholder="Subject" />
                <textarea className="min-h-[140px] rounded-2xl border border-amber-200 bg-white px-4 py-3 outline-none placeholder:text-stone-400 focus:border-orange-400 sm:col-span-2" placeholder="Write your message, support interest, or event inquiry..." />
                <button className="rounded-full bg-orange-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-800 sm:col-span-2">
                  Send Inquiry
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-amber-200 bg-amber-100/70">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-stone-700 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="font-bold text-stone-900">धर्मोदय दशावतार बालन समूह</p>
              <p>Preserving Hindu culture through devotion, performance, and public education.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {nav.map((item) => (
                item === "Blog" ? (
                  <Link key={item} to="/blog" className="transition hover:text-orange-700">
                    {item}
                  </Link>
                ) : (
                  <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="transition hover:text-orange-700">
                    {item}
                  </a>
                )
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function GallerySection() {
  const [showGallery, setShowGallery] = useState(false);

  const galleryPreviews = [
    {
      title: "Dashavatar performance moments",
      image: "https://scontent.fmel14-1.fna.fbcdn.net/v/t39.30808-6/471164559_1223087862090154_8202950257976221464_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=EG7pQOCR2FkQ7kNvwHHl_vW&_nc_oc=AdkmIhREIRfITPxewp4bYN0fBxD1LKXbF92Pjt8ycRmMGwBi1fK9JCbtdrBc_YHQ4AU&_nc_zt=23&_nc_ht=scontent.fmel14-1.fna&_nc_gid=c0TpH7sQ66v0LbIXtTIWiw&_nc_ss=8&oh=00_Afz_eAwz0Vnaj-cLoMOdJSyLckG74UleLCYZ7ZeCI9Cgkw&oe=69B967B8"
    },
    {
      title: "Jhaki and festival celebrations",
      image: "https://scontent.fmel14-2.fna.fbcdn.net/v/t39.30808-6/470801114_1223088285423445_38073649762550490_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=GCTQMVpjClgQ7kNvwHZxWEZ&_nc_oc=AdkJILO0rjujiRWh-uh1k1fqYebzPPfa9ykVcntkf402O4d_5ENdpYOhTqLymFpH8Fg&_nc_zt=23&_nc_ht=scontent.fmel14-2.fna&_nc_gid=-XTQUhSbpad3OAwLxlRaQA&_nc_ss=8&oh=00_AfyxjOOcc1d3hU7wXPXDCD06f9H-IEXOCmpG826i4dC0Vw&oe=69B9752C"
    },
    {
      title: "Temple construction updates",
      image: "https://scontent.fmel14-2.fna.fbcdn.net/v/t39.30808-6/641203618_1532991404433130_1233190449995283699_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=B58CKxMMOK0Q7kNvwHPUzpz&_nc_oc=AdkiwghAKMVmjkeq81rqr3ECzQtaBScVdPlJJpQhHIMBQvgyNU-xH3NKeAz-jNWIBB0&_nc_zt=23&_nc_ht=scontent.fmel14-2.fna&_nc_gid=BDndmg5I0Lb4NDsNVT5b8g&_nc_ss=8&oh=00_AfzLMqHQE_WDCS6HYz2bu1f0CsXoOyl-Ugbd-HbIdlXTTA&oe=69B97B26"
    },
    {
      title: "Community members and devotees",
      image: "https://scontent.fmel14-1.fna.fbcdn.net/v/t39.30808-6/470630260_1223088175423456_7993321509240119714_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=MmkVUynUVBUQ7kNvwF8hyQ0&_nc_oc=AdnqdKG6LIvpCDRD5BeH0cRIPDUrXD_uaw2eVzrv9xS5emlH3quh8zw3P0UYiXs6RLk&_nc_zt=23&_nc_ht=scontent.fmel14-1.fna&_nc_gid=UZnPEU8yl-QXGaucSYnvOQ&_nc_ss=8&oh=00_AfxofVWK_SiBCp4XcMVyIJbCzRqENfS2lo9S7cbTi7zo7A&oe=69B98319"
    },
  ];

  return (
    <section id="gallery" className="bg-white py-16">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    
    {/* Header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-700">
          Gallery concept
        </p>
        <h3 className="mt-3 text-3xl font-black text-stone-900 sm:text-4xl">
          Visual storytelling for culture, devotion, and progress
        </h3>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setShowGallery(!showGallery)}
        className="w-fit rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-orange-400 hover:text-orange-700"
      >
        {showGallery ? "Hide Gallery" : "View Full Gallery"}
      </button>
    </div>

    {/* Preview Cards */}
    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {galleryPreviews.map((item, index) => (
        <div
          key={item.title}
          className="group flex min-h-[240px] items-end overflow-hidden rounded-[1.75rem] border border-amber-200 p-6 shadow-sm relative"
          style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="relative z-10">
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-orange-700">
              Gallery
            </span>
            <h4 className="mt-3 text-xl font-bold text-white">{item.title}</h4>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* FULL GALLERY (Hidden by default) */}
  {showGallery && (
    <div id="full-gallery" className="mt-24 bg-amber-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="mb-12 text-center text-3xl font-black text-stone-900">
          Complete Cultural Gallery
        </h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
            "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
            "https://images.unsplash.com/photo-1546182990-dffeafbe841d",
            "https://images.unsplash.com/photo-1552410260-0fd9b577afa6",
            "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
            "https://images.unsplash.com/photo-1519817650390-64a93db511aa",
            "https://images.unsplash.com/photo-1513151233558-d860c5398176",
          ].map((img, i) => (
            <img
              key={i}
              src={`${img}?auto=format&fit=crop&w=800&q=80`}
              alt={`Gallery image ${i + 1}`}
              className="h-64 w-full rounded-xl object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  )}
</section>
  );
}
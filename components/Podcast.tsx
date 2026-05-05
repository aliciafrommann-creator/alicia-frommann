'use client'

const EPISODES = [
  {
    num:   'Episode 01',
    title: 'The Future is Us',
    desc:  'What does it mean to change a system? An introduction to thinking in feedback loops, interconnections, and the hidden leverage points that shape everything around us.',
  },
  {
    num:   'Episode 02',
    title: 'Falsch herum',
    desc:  'From political silos to palm oil, from German energy dependency to the automotive crisis — why we always analyze symptoms, and how the Iceberg Model changes what we’re even looking at.',
  },
]

export default function Podcast() {
  return (
    <section id="podcast" className="border-t border-[#1C1C1A] px-16 py-[120px]">
      <div className="flex justify-between items-end mb-16">
        <div>
          <div className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#6B9E5E] mb-7 flex items-center gap-3.5">
            <span className="w-7 h-px bg-[#6B9E5E]" />
            Podcast
          </div>
          <h2 className="font-cormorant font-normal leading-[1.08]" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
            Making sense of<br />the <em className="text-[#857E74]">UNKNOWN</em>
          </h2>
        </div>
        <p className="text-[13px] text-[#857E74] max-w-[260px] leading-[1.75] text-right">
          Systems thinking, inner work, and transformation — conversations that look beneath the surface of everything.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-px bg-[#1C1C1A]">
        {EPISODES.map((ep, i) => (
          <div key={i} className="bg-[#08080A] p-9 hover:bg-[#101010] transition-colors duration-300">
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#6B9E5E] mb-5">{ep.num}</div>
            <h3 className="font-cormorant text-[22px] font-normal mb-3 leading-[1.2]">{ep.title}</h3>
            <p className="text-[13px] text-[#857E74] leading-[1.7]">{ep.desc}</p>
          </div>
        ))}
        <div className="bg-[#08080A] border border-dashed border-[#1C1C1A] p-9 flex items-center justify-center">
          <p className="font-cormorant text-[17px] text-[#3A3935] italic">Next episode — coming soon</p>
        </div>
        <div className="bg-[#161614] p-9">
          <div className="text-[10px] tracking-[0.2em] uppercase text-[#3A3935] mb-5">The Mission</div>
          <p className="font-cormorant text-[17px] font-light text-[#857E74] italic leading-[1.6]">
            “Not prescribing what to think. Creating the space in which deeper thinking becomes possible.”
          </p>
        </div>
      </div>
    </section>
  )
}

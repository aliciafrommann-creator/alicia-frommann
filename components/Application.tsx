export default function Application() {
  return (
    <section id="application" style={{padding:'var(--pad-y) var(--pad-x)',maxWidth:'1480px',margin:'0 auto',borderTop:'1px solid var(--line)'}}>

      <div className="section-head">
        <span className="tag">§ 02 — Application</span>
        <span style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'7px 14px',border:'1px solid var(--blue)',borderRadius:'999px',fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.04em'}}>
          <i style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--blue)',animation:'pulse 2s var(--ease-out) infinite',display:'inline-block'}} />
          Gründerszene Startup-Sommercamp 2025 · Deadline 31. Mai
        </span>
      </div>

      <h2 className="display-2">
        <span className="reveal-line"><span>The idea I want</span></span>
        <span className="reveal-line"><span className="italic">to build in Berlin.</span></span>
      </h2>

      <p className="lede" style={{maxWidth:'680px',marginBottom:'clamp(56px,8vw,96px)'}}>
        A multiplayer game for real-world participation — where sustainability becomes a side effect of identity. Not a sustainability app. A platform that makes people feel more alive, more connected, more present. Missions. Teams. Streaks. Real rewards. AI coordination. Built for humans as they are.
      </p>

      <div style={{borderTop:'1px solid var(--line)',paddingTop:'clamp(48px,6vw,72px)',marginBottom:'clamp(48px,6vw,72px)'}}>
        <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.1em',textTransform:'uppercase' as const,marginBottom:'32px'}}>The thesis</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'clamp(32px,5vw,64px)'}}>
          <div>
            <p style={{fontSize:'clamp(17px,1.5vw,22px)',lineHeight:1.55,color:'var(--ink)',fontWeight:500,letterSpacing:'-.02em',marginBottom:'20px'}}>
              Every time I shop online — which is most of the time, because it&apos;s fast and frictionless — I feel the gap between what I value and what I do. I know that every order from a big chain is one less sale for a small business that might have the same thing, made better, by someone I could actually support. Ecologically. Socially. Economically. I know. And I click anyway.
            </p>
            <p style={{fontSize:'clamp(17px,1.5vw,22px)',lineHeight:1.5,color:'var(--ink)',fontWeight:500,letterSpacing:'-.02em',marginBottom:'16px'}}>
              Most sustainability apps failed. They built for morality. Modern consumer platforms built for emotional reinforcement.
            </p>
            <p style={{fontSize:'clamp(17px,1.5vw,22px)',lineHeight:1.5,color:'var(--blue)',fontWeight:500,letterSpacing:'-.02em',fontStyle:'italic',marginBottom:0}}>
              Emotional reinforcement scales faster than intention alone.
            </p>
            <div style={{marginTop:'32px',paddingTop:'32px',borderTop:'1px solid var(--line)'}}>
              <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'0.08em',textTransform:'uppercase' as const,marginBottom:'12px'}}>Why 2026</p>
              <p style={{fontSize:'clamp(15px,1.3vw,18px)',lineHeight:1.65,color:'var(--ink-2)',maxWidth:'480px',margin:0}}>
                AI-generated content is flooding every platform. Real-world human participation is becoming the scarce resource. The timing has never been better — and the counter-position has never been clearer.
              </p>
            </div>
          </div>
          <div>
            <p style={{fontSize:'clamp(15px,1.2vw,18px)',lineHeight:1.8,color:'var(--ink-2)',marginBottom:'16px'}}>
              The trojan horse principle: people come for the missions, the rewards, the fun of competing with friends — and leave with different mental models. Not because they were lectured. Because it felt good.
            </p>
            <p style={{fontSize:'clamp(15px,1.2vw,18px)',lineHeight:1.8,color:'var(--ink-2)',marginBottom:'16px'}}>
              Sustainability is not one thing — it&apos;s three interlocking loops. Ecological: CO₂, packaging, supply chains. Social: supporting small local and online businesses instead of big chains that absorb all the money and kill the rest. Economic: keeping spending in local ecosystems, choosing brands that pay fairly. All connected — and exactly why a mission this week makes the next one make sense. Not as a rule. As experience that explains itself.
            </p>
            <p style={{fontSize:'clamp(15px,1.2vw,18px)',lineHeight:1.8,color:'var(--ink-2)'}}>
              Digital technologies amplify power. The same tools that let Amazon reach everyone have made it harder for small sustainable businesses to be found — not because they don&apos;t exist, but because visibility belongs to those who can buy it. Rippl creates space for both sides of that equation. Not just connecting consumers to small brands — but giving those brands a place to grow together. To find each other. To create joint events, collaborations, shared missions. A community of builders making the same bet: that the right choice can also be the obvious one.
            </p>
          </div>
        </div>
      </div>

      <div style={{borderTop:'1px solid var(--line)',paddingTop:'clamp(48px,6vw,72px)',marginBottom:'clamp(48px,6vw,72px)'}}>
        <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--ink-3)',letterSpacing:'.1em',textTransform:'uppercase' as const,marginBottom:'32px'}}>Six mechanics · one loop</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:'1px',background:'var(--line)'}}>
          {[
            {n:'01',t:'Missions',b:'Real-world micro-missions — low friction, high emotional reward. Evening walks. Café rituals. No-phone moments. Local discovery. Tiny social courage. AI picks the right moment.',sub:'QR at partner shops · AI timing · 10-min max'},
            {n:'02',t:'Teams',b:'Compete with friends and family. More active teammates = better reward multiplier. The social loop that drives viral growth — and makes breaking the streak feel personal.',sub:'Individual baseline → Team 1.5× multiplier → better vouchers → invite friends'},
            {n:'03',t:'Brand Ecosystem',b:'Sustainable brands offer verified rewards for completed missions. More users → more brand value → better rewards → more users. Sustainability scales as a side effect of participation.',sub:'Real network effect. The loop nobody has built yet.'},
            {n:'04',t:'AI coordination',b:'Contextually alive — not static. AI understands timing, location, mood, social energy, scroll patterns. “Free 30 minutes before your next class. Sunset in 40 minutes. Your group is nearby.” The right nudge at the right moment. No surveillance. Coordination.',sub:''},
            {n:'05',t:'Scroll interruption',b:'“Catch me before I disappear into scrolling.” An optional mode where AI notices vulnerable hours and passive loops — and offers a 2-minute mission instead. Not guilt. A tiny opening into reality.',sub:''},
            {n:'06',t:'Energy-aware missions',b:'Low energy. Need calm. Need movement. Need connection. Need courage. Missions adapt to where you are emotionally — not where the app wants you to be.',sub:''},
          ].map(({n,t,b,sub})=>(
            <div key={n} style={{padding:'clamp(28px,4vw,44px)',background:'var(--paper)'}}>
              <span style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.1em',display:'block',marginBottom:'16px'}}>{n} /</span>
              <h3 style={{fontSize:'clamp(20px,2vw,28px)',fontWeight:600,color:'var(--ink)',letterSpacing:'-.02em',marginBottom:'16px',lineHeight:1.1}}>{t}</h3>
              <p style={{fontSize:'14px',lineHeight:1.75,color:'var(--ink-2)',marginBottom: sub ? '12px' : 0}}>{b}</p>
              {sub && <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'10px',color:'var(--ink-3)',letterSpacing:'.04em',lineHeight:1.6,margin:0}}>{sub}</p>}
            </div>
          ))}
        </div>
      </div>

      <div style={{borderTop:'1px solid var(--line)',paddingTop:'clamp(48px,6vw,72px)',marginBottom:'clamp(48px,6vw,72px)'}}>
        <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--ink-3)',letterSpacing:'.1em',textTransform:'uppercase' as const,marginBottom:'32px'}}>Product · How it works</p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))',gap:'1px',background:'var(--line)',marginBottom:'32px'}}>
          {[
            {
              tag:'Onboarding',
              items:[
                'Create profile → immediate 100 Impact Points (hook from minute one)',
                'AI onboarding flow — skippable, used for personalization',
                'Straight to dashboard: impact profile + active missions',
                'After AI questions: personal sustainability profile — strong areas + potential',
              ]
            },
            {
              tag:'Dashboard',
              items:[
                'CO₂ saved · local businesses supported · plastic avoided',
                'Community layer: Stadt → Bezirk → Bundesland → Deutschland',
                'Collective impact visible at every level',
                'Weekly + monthly mission active and trackable',
              ]
            },
            {
              tag:'Missions',
              items:[
                'Weekly: 20 credits on completion',
                'Monthly: specific geo-localized voucher (theme-matched)',
                'Types: quiz · action (photo proof) · shopping (plastic-free etc.)',
                'Always: tips + local options (market, Unverpacktladen, supermarket alt.)',
              ]
            },
            {
              tag:'Streaks',
              items:[
                'Streak per completed mission',
                'Milestone surprises at 10 · 25 · 50 · 100 streaks',
                'Forgiveness mechanic: one free pass per month',
                'Team multiplier: active teammates = better rewards',
              ]
            },
            {
              tag:'Community',
              items:[
                'Pre-set: Stadt, Bezirk, Bundesland, Deutschland',
                'Start competitions within any community',
                'Very active community → extra credits unlocked',
                'Leaderboard with anonymization option (GDPR)',
              ]
            },
            {
              tag:'Credits',
              items:[
                '100 on signup · 20 per weekly mission',
                '200 credits = 10% voucher at participating shop',
                '100 credits = 5% voucher (shop decides their rate)',
                'Credits expire after 12 months — drives engagement',
              ]
            },
          ].map(({tag,items})=>(
            <div key={tag} style={{padding:'clamp(24px,3vw,36px)',background:'var(--paper)'}}>
              <span style={{fontFamily:'var(--font-geist-mono)',fontSize:'10px',letterSpacing:'.1em',textTransform:'uppercase' as const,color:'var(--blue)',display:'block',marginBottom:'16px'}}>{tag}</span>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column' as const,gap:'10px'}}>
                {items.map(item=>(
                  <li key={item} style={{display:'flex',gap:'8px',alignItems:'baseline'}}>
                    <span style={{color:'var(--blue)',fontSize:'10px',flexShrink:0}}>→</span>
                    <span style={{fontSize:'13px',lineHeight:1.55,color:'var(--ink-2)'}}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{marginTop:'32px',padding:'32px',background:'var(--paper)',border:'1px solid var(--line)',borderRadius:'8px'}}>
          <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'10px',letterSpacing:'.1em',textTransform:'uppercase' as const,color:'var(--ink-3)',marginBottom:'16px'}}>The one unsolved problem — proof verification</p>
          <p style={{fontSize:'clamp(15px,1.2vw,18px)',color:'var(--ink)',fontWeight:500,letterSpacing:'-.01em',marginBottom:'12px'}}>
            How do you prove someone actually took the bike three times?
          </p>
          <p style={{fontSize:'14px',lineHeight:1.75,color:'var(--ink-2)',marginBottom:'16px'}}>
            Hybrid model: QR at partner shops (verified). Photo upload with AI plausibility check for action missions. Honor system with social accountability for the rest — communicated transparently. Duolingo doesn&apos;t verify you actually learned the word either.
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))',gap:'1px',background:'var(--line)'}}>
            {[
              {m:'QR at Shop',v:'100% verified',p:'Shop missions only'},
              {m:'Photo + AI',v:'Plausible check',p:'Action missions'},
              {m:'Honor System',v:'Zero friction',p:'Personal habits'},
              {m:'GPS (opt-in)',v:'Automatic',p:'GDPR consent required'},
            ].map(({m,v,p})=>(
              <div key={m} style={{padding:'16px',background:'var(--paper)'}}>
                <div style={{fontSize:'13px',fontWeight:600,color:'var(--ink)',marginBottom:'4px'}}>{m}</div>
                <div style={{fontSize:'11px',color:'var(--blue)',marginBottom:'2px'}}>{v}</div>
                <div style={{fontFamily:'var(--font-geist-mono)',fontSize:'10px',color:'var(--ink-3)'}}>{p}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{borderTop:'1px solid var(--line)',paddingTop:'clamp(48px,6vw,72px)',marginBottom:'clamp(48px,6vw,72px)'}}>
        <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.1em',textTransform:'uppercase' as const,marginBottom:'32px'}}>Cold start solved · Week 1</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'clamp(32px,5vw,64px)',alignItems:'start'}}>
          <div>
            <p style={{fontSize:'clamp(17px,1.5vw,22px)',lineHeight:1.55,color:'var(--ink)',fontWeight:500,letterSpacing:'-.02em',marginBottom:'20px'}}>
              Classic chicken-and-egg: no users → no brands → no rewards → no users.
            </p>
            <p style={{fontSize:'clamp(17px,1.5vw,22px)',lineHeight:1.55,color:'var(--blue)',fontStyle:'italic',letterSpacing:'-.02em',marginBottom:'28px'}}>
              The unlock: shops need zero users to participate.
            </p>
            <p style={{fontSize:'clamp(15px,1.2vw,18px)',lineHeight:1.8,color:'var(--ink-2)',marginBottom:'16px'}}>
              A sustainable shop — physical or online — gets: free listing, QR code or referral link, visibility to an audience that specifically wants them, a 5% voucher they define themselves. They risk nothing. Week 1: walk into 10 shops in Prenzlauer Berg and Kreuzberg, contact 10 small sustainable online brands. 20 partners before writing a single line of code.
            </p>
            <p style={{fontSize:'clamp(15px,1.2vw,18px)',lineHeight:1.8,color:'var(--ink-2)'}}>
              The QR at the counter becomes the acquisition channel — users scanning it are pre-qualified because they&apos;re already in a sustainable shop.
            </p>
          </div>
          <div style={{display:'flex',flexDirection:'column' as const,gap:'1px',background:'var(--line)'}}>
            {[
              {step:'Week 1',action:'10 shop partnerships in Berlin — Prenzlauer Berg, Kreuzberg, Mitte',type:'Physical'},
              {step:'Week 2',action:'User sees QR at checkout → scans → downloads → mission active',type:'Acquisition'},
              {step:'Week 3',action:'User invites friends to team → economic incentive: better rewards',type:'Virality'},
              {step:'Week 5',action:'Education: first Uni/school pilot via existing network',type:'Scale'},
              {step:'Week 8',action:'First corporate interest → B2B2C bridge building',type:'Revenue'},
            ].map(({step,action,type})=>(
              <div key={step} style={{padding:'20px 24px',background:'var(--paper)',display:'grid',gridTemplateColumns:'80px 1fr 80px',gap:'12px',alignItems:'center'}}>
                <span style={{fontFamily:'var(--font-geist-mono)',fontSize:'10px',color:'var(--blue)',letterSpacing:'.06em'}}>{step}</span>
                <span style={{fontSize:'13px',lineHeight:1.5,color:'var(--ink-2)'}}>{action}</span>
                <span style={{fontFamily:'var(--font-geist-mono)',fontSize:'9px',color:'var(--ink-3)',letterSpacing:'.06em',textAlign:'right' as const}}>{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{borderTop:'1px solid var(--line)',paddingTop:'clamp(48px,6vw,72px)',marginBottom:'clamp(48px,6vw,72px)'}}>
        <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--ink-3)',letterSpacing:'.1em',textTransform:'uppercase' as const,marginBottom:'32px'}}>Revenue model · how this becomes a business</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:'1px',background:'var(--line)',marginBottom:'24px'}}>
          {[
            {phase:'10 Wochen',rev:'€0',label:'Traction beweisen',items:['User base aufbauen','Shop partnerships Berlin','Product-Market-Fit messen'],accent:'var(--ink-3)'},
            {phase:'Jahr 1',rev:'Bridge',label:'Erste echte Euros',items:['Shop Commissions: 10% pro Kauf','2–3 Corporate Deals manuell','Premium User: €6/Monat'],accent:'var(--ink-2)'},
            {phase:'Jahr 2',rev:'Scale',label:'Plattform-Revenue',items:['Shop Subscriptions: €29–49/Mo','Corporate B2B2C: €5/Mitarbeiter/Mo','Premium bei 100k+ Usern'],accent:'var(--blue)'},
          ].map(({phase,rev,label,items,accent})=>(
            <div key={phase} style={{padding:'32px',background:'var(--paper)'}}>
              <span style={{fontFamily:'var(--font-geist-mono)',fontSize:'10px',color:'var(--ink-3)',letterSpacing:'.08em',display:'block',marginBottom:'8px'}}>{phase}</span>
              <span style={{fontSize:'48px',fontWeight:600,color:accent,lineHeight:1,display:'block',letterSpacing:'-.04em',marginBottom:'6px'}}>{rev}</span>
              <span style={{fontSize:'13px',color:'var(--ink-2)',fontWeight:500,display:'block',marginBottom:'16px'}}>{label}</span>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column' as const,gap:'8px'}}>
                {items.map(item=>(
                  <li key={item} style={{display:'flex',gap:'8px',alignItems:'baseline'}}>
                    <span style={{color:'var(--blue)',fontSize:'10px',flexShrink:0}}>→</span>
                    <span style={{fontSize:'12px',lineHeight:1.55,color:'var(--ink-2)'}}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div style={{borderTop:'1px solid var(--line)',paddingTop:'clamp(48px,6vw,72px)',marginBottom:'clamp(48px,6vw,72px)'}}>
        <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.1em',textTransform:'uppercase' as const,marginBottom:'32px'}}>10-Wochen-Plan · was ich baue</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))',gap:'1px',background:'var(--line)',marginBottom:'24px'}}>
          {[
            {w:'Wk 1–2',t:'Foundation',items:['Auth + Onboarding','Values-Auswahl','Mission System','Streak Tracking']},
            {w:'Wk 3–4',t:'Core Loops',items:['Team Creation','Impact Visualization','Leaderboard','Collective Impact']},
            {w:'Wk 5–6',t:'Shop Layer',items:['QR Code System','Online Shop Links','Shop + Brand Discovery','Berlin Partnerships','Small Online Brands']},
            {w:'Wk 7–8',t:'AI Features',items:['Sustainable Product Finder','Small Brand Recommender','Mission Personalization','Scroll Interruption','Energy-Aware Mode']},
            {w:'Wk 9–10',t:'Launch + Pitch',items:['Push Notifications','First Real Users','Traction Data','Jury Presentation']},
          ].map(({w,t,items})=>(
            <div key={w} style={{padding:'24px 20px',background:'var(--paper)'}}>
              <span style={{fontFamily:'var(--font-geist-mono)',fontSize:'10px',color:'var(--blue)',letterSpacing:'.06em',display:'block',marginBottom:'8px'}}>{w}</span>
              <h4 style={{fontSize:'14px',fontWeight:600,color:'var(--ink)',marginBottom:'14px',letterSpacing:'-.01em'}}>{t}</h4>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column' as const,gap:'6px'}}>
                {items.map(i=>(<li key={i} style={{fontSize:'11px',color:'var(--ink-2)',lineHeight:1.5}}>{i}</li>))}
              </ul>
            </div>
          ))}
        </div>
        <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--ink-3)',letterSpacing:'.04em',lineHeight:1.8}}>
          Stack: Next.js 14 · Supabase · Anthropic API · Vercel — same as ThinkTogether. No new learning. Build immediately.
        </p>
      </div>

      <div style={{borderTop:'1px solid var(--line)',paddingTop:'clamp(48px,6vw,72px)'}}>
        <p style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.1em',textTransform:'uppercase' as const,marginBottom:'clamp(24px,3vw,40px)'}}>
          Why Berlin · Why now · Why this.
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))',gap:'1px',background:'var(--line)',marginBottom:'clamp(48px,5vw,72px)'}}>
          {[
            {n:'01',title:'Connect.',body:'I build mostly alone. Berlin is where the density is — the kind that makes a participation platform real. Ten weeks in the city where the product has to work first.'},
            {n:'02',title:'Find my co-founder.',body:'ThinkTogether needs a technical co-founder. Not a LinkedIn connection — someone I build with, argue with, trust. The kind of person who shows up in Berlin in July to make something real.'},
            {n:'03',title:'Build in public.',body:'Direct feedback. Full focus. The pressure of shipping in front of people who care. This is not a risk for me. It’s the exact condition in which I learn fastest.'},
          ].map(({n,title,body})=>(
            <div key={n} style={{padding:'clamp(28px,4vw,48px)',background:'var(--paper)'}}>
              <span style={{fontFamily:'var(--font-geist-mono)',fontSize:'11px',color:'var(--blue)',letterSpacing:'.08em',display:'block',marginBottom:'20px'}}>{n} /</span>
              <h3 style={{fontSize:'clamp(24px,2.8vw,40px)',fontWeight:600,color:'var(--ink)',lineHeight:1.05,marginBottom:'16px',letterSpacing:'-.025em',fontStyle:'italic'}}>{title}</h3>
              <p style={{fontSize:'14px',lineHeight:1.75,color:'var(--ink-2)'}}>{body}</p>
            </div>
          ))}
        </div>

        <div style={{maxWidth:'700px',margin:'0 auto',textAlign:'center' as const,paddingBottom:'clamp(48px,6vw,80px)'}}>
          <p style={{fontSize:'clamp(22px,2.5vw,36px)',lineHeight:1.3,color:'var(--ink)',fontWeight:600,letterSpacing:'-.025em',marginBottom:'24px'}}>
            This is not a strategic move.<br />
            <span style={{fontStyle:'italic',color:'var(--blue)'}}>It is a dream, four times over.</span>
          </p>
          <p style={{fontSize:'15px',lineHeight:1.75,color:'var(--ink-2)',maxWidth:'560px',margin:'0 auto 32px'}}>
            Weil es Spaß macht. Weil man dazugehört. Weil man etwas bewegt. And because the internet optimized consumption — and someone has to try optimizing participation instead.
          </p>
          <a href="mailto:alicia.frommann@gmail.com" style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'14px 28px',background:'var(--ink)',color:'var(--paper)',borderRadius:'999px',fontSize:'13px',fontWeight:600,letterSpacing:'.04em',textDecoration:'none',transition:'background .3s'}}>
            <span>Write to me</span><span style={{color:'var(--blue)'}}>→</span>
          </a>
        </div>
      </div>

    </section>
  )
}

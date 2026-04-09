import {
  HandHeart,
  Heart,
  Users,
  BookOpen,
  MessageCircleHeart,
  Sun,
  Moon,
  Star,
  Shield,
  Leaf,
  Phone,
  ArrowRight,
  CheckCircle2,
  Baby,
} from "lucide-react";
import Link from "next/link";

const parentTips = [
  {
    title: "Your child follows your lead",
    desc: "Children pick up on parental anxiety more than we realize. When you can show calm — even if you don't feel it — they feel safer. This doesn't mean hiding everything. It means managing your own fear in ways that don't spill onto them.",
  },
  {
    title: "You are allowed to grieve",
    desc: "Receiving a cancer diagnosis for your child is traumatic. Grief, fear, anger — these are normal. Don't suppress them; find a safe outlet (a therapist, a friend, a support group) away from your child.",
  },
  {
    title: "Take shifts",
    desc: "If there are two parents or caregivers, alternate 'on duty' shifts at the hospital. The second parent needs to rest, eat, and maintain some normalcy. Exhausted parents make poorer decisions and model fear to their child.",
  },
  {
    title: "Maintain some normalcy",
    desc: "On good treatment days, try to maintain normal routines — meals together, bedtime stories, favorite shows. Cancer shouldn't consume every moment. These normal moments are medicine too.",
  },
  {
    title: "Accept help",
    desc: "When people offer to help, say yes. Meals, childcare for siblings, driving to appointments, grocery runs. You cannot do this alone and you shouldn't try.",
  },
  {
    title: "Protect your marriage or partnership",
    desc: "Cancer puts enormous stress on relationships. Some couples drift apart from different coping styles. Check in with each other. If needed, couples counseling is not a weakness — it's protective.",
  },
];

const childrenTips = [
  {
    age: "Ages 3–5",
    icon: Baby,
    tips: [
      "Use simple, concrete language: 'You have sick cells in your body. The medicine will help fix them.'",
      "Focus on what will happen practically: 'We'll go to the hospital. Doctors and nurses will take care of you. I will be there.'",
      "Don't say 'you might die' — they can't process this and it creates terror without helping",
      "Read age-appropriate books about cancer or hospital visits",
      "Use play therapy — many hospitals have child life specialists",
    ],
  },
  {
    age: "Ages 6–10",
    icon: Heart,
    tips: [
      "More detail is OK: 'You have something called cancer. It means some cells aren't working right. Medicine will fight those cells.'",
      "Be honest about treatment side effects they'll experience (hair loss, tiredness, nausea)",
      "Involve them in small decisions: which hat to wear, which show to watch during infusion",
      "Maintain school contact and friendships — social connection matters enormously",
      "Child life specialists can help explain diagnosis and prepare for procedures",
    ],
  },
  {
    age: "Ages 11–18",
    icon: Sun,
    tips: [
      "Teens can handle more information and want it — give them age-appropriate facts",
      "Ask what they want to know vs what they don't want to know. Respect their answer.",
      "Peer connection is crucial. Help maintain friendships, social media contact",
      "Watch for depression and anxiety — common and treatable",
      "Give them control where possible: treatment schedule, who knows about diagnosis",
      "Teen-specific support groups exist — many online now",
    ],
  },
];

const breathingExercise = [
  { step: "1", action: "Breathe in slowly", count: "Count to 4" },
  { step: "2", action: "Hold your breath", count: "Count to 4" },
  { step: "3", action: "Breathe out slowly", count: "Count to 6" },
  { step: "4", action: "Pause", count: "Count to 2" },
];

const faithResources = [
  {
    tradition: "Any faith",
    tips: [
      "Speak with your religious leader — clergy are often trained in pastoral counseling for illness",
      "Many hospitals have chaplains available 24/7, regardless of your faith tradition",
      "Prayer, meditation, or mindfulness can reduce anxiety and provide comfort",
      "Faith communities often provide practical support — meals, childcare, transportation",
    ],
  },
  {
    tradition: "General Spirituality",
    tips: [
      "Finding meaning in the experience can be a source of strength",
      "Gratitude practices — even for small things — shift focus from fear to presence",
      "Nature, music, and art can provide spiritual comfort without formal religion",
      "Journaling can be a powerful way to process emotions and find meaning",
    ],
  },
];

const organizations = [
  { name: "Alex's Lemonade Stand Foundation", focus: "Childhood cancer support + funding", url: "https://www.alexslemonade.org" },
  { name: "American Childhood Cancer Organization", focus: "Education, advocacy, support for families", url: "https://www.acco.org" },
  { name: "Children's Oncology Group (COG)", focus: "Clinical trials + treatment standards", url: "https://www.childrensoncologygroup.org" },
  { name: "Cancer Care", focus: "Free counseling, support groups, financial assistance", url: "https://www.cancercare.org" },
  { name: "The Leukemia & Lymphoma Society", focus: "Lymphoma + leukemia specific support", url: "https://www.lls.org" },
  { name: "National Childhood Cancer Foundation", focus: "Research funding + family resources", url: "https://www.curesearch.org" },
  { name: "Pediatric Cancer Research Foundation", focus: "Support for pediatric cancer families", url: "https://pcrf-kids.org" },
  { name: "Ronald McDonald House", focus: "Housing near treatment centers for families", url: "https://www.rmhc.org" },
];

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 badge bg-emerald-100 text-emerald-700 mb-4">
          <HandHeart className="w-3.5 h-3.5" />
          Support Resources
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-3">You Don&apos;t Have to Do This Alone</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Resources, guidance, and strategies for parents, children, families — and for keeping your own strength
          when everything feels overwhelming.
        </p>
      </div>

      {/* Breathing exercise */}
      <section className="mb-10">
        <div className="bg-gradient-to-r from-hope-600 to-hope-800 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-hope-200" />
            <h2 className="font-bold text-white text-lg">Right Now: A Calming Breath</h2>
          </div>
          <p className="text-hope-200 text-sm mb-6">If you&apos;re feeling overwhelmed right now, try this box breathing technique. It activates the parasympathetic nervous system and reduces anxiety within 2–3 minutes.</p>
          <div className="grid grid-cols-4 gap-3">
            {breathingExercise.map(({ step, action, count }) => (
              <div key={step} className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-black text-pulse-300 mb-1">{step}</div>
                <div className="text-white text-xs font-semibold">{action}</div>
                <div className="text-hope-300 text-xs mt-1">{count}</div>
              </div>
            ))}
          </div>
          <p className="text-hope-300 text-xs mt-4 text-center">Repeat 4–6 times. Do this before appointments, during waiting, or at 3am when fear peaks.</p>
        </div>
      </section>

      {/* For parents */}
      <section id="parents" className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Users className="w-5 h-5 text-hope-600" />
          <h2 className="text-2xl font-bold text-slate-800">For Parents</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parentTips.map(({ title, desc }) => (
            <div key={title} className="card">
              <div className="flex items-start gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-hope-500 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed pl-6">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For children — by age */}
      <section id="children" className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Heart className="w-5 h-5 text-rose-500" />
          <h2 className="text-2xl font-bold text-slate-800">Talking to Children About Cancer</h2>
        </div>
        <p className="text-slate-500 text-sm mb-5">
          Research shows that honest, age-appropriate information helps children cope better than protection through secrecy. Here&apos;s how to approach it by age.
        </p>
        <div className="space-y-5">
          {childrenTips.map(({ age, icon: Icon, tips }) => (
            <div key={age} className="card">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-rose-600" />
                </div>
                <h3 className="font-bold text-slate-800">{age}</h3>
              </div>
              <ul className="space-y-2">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-rose-300 rounded-full mt-2 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Faith & Spirituality */}
      <section id="faith" className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Star className="w-5 h-5 text-pulse-500" />
          <h2 className="text-2xl font-bold text-slate-800">Faith, Spirituality & Strength</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {faithResources.map(({ tradition, tips }) => (
            <div key={tradition} className="card bg-gradient-to-b from-amber-50 to-white border-amber-100">
              <h3 className="font-bold text-slate-800 mb-3">{tradition}</h3>
              <ul className="space-y-2">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <Star className="w-3 h-3 text-pulse-400 flex-shrink-0 mt-1" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Daily routines */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-5">Daily Wellbeing Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="w-5 h-5 text-pulse-500" />
              <h3 className="font-bold text-slate-800">Morning Anchors</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              {["5 minutes of breathing or meditation before looking at your phone", "Write 3 things you're grateful for — even tiny things", "Eat breakfast even if you don't feel hungry", "Set one small intention for the day", "Check in with your child — 'How are you feeling today?'"].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-pulse-400 font-bold text-xs mt-0.5 flex-shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <Moon className="w-5 h-5 text-violet-500" />
              <h3 className="font-bold text-slate-800">Evening Wind-Down</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-600">
              {["Limit cancer-related research after 8pm — give your brain a break", "No Reddit, forums, or 'survival story' reading at night", "A brief family ritual: share one good thing from the day", "Physical touch — hug your child, hold their hand", "Write down worries in a journal so they're out of your head"].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-violet-400 font-bold text-xs mt-0.5 flex-shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Emergency mental health */}
      <section className="mb-10">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Phone className="w-5 h-5 text-rose-600" />
            <h2 className="font-bold text-rose-800 text-lg">Mental Health Crisis Resources</h2>
          </div>
          <p className="text-sm text-rose-700 mb-4">
            If you or anyone in your family is feeling unable to cope, having thoughts of self-harm, or experiencing severe depression or anxiety:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: "988 Suicide & Crisis Lifeline", contact: "Call or text 988", note: "US — 24/7 crisis support" },
              { name: "Crisis Text Line", contact: "Text HOME to 741741", note: "US — text-based crisis support" },
              { name: "Hospital Social Worker", contact: "Ask your oncology team", note: "Free, available at treatment centers" },
              { name: "Cancer Care Counseling", contact: "1-800-813-4673", note: "Free professional counseling for cancer patients/families" },
            ].map(({ name, contact, note }) => (
              <div key={name} className="bg-white rounded-xl p-3 border border-rose-100">
                <div className="font-semibold text-slate-800 text-sm">{name}</div>
                <div className="text-hope-700 text-sm font-bold">{contact}</div>
                <div className="text-xs text-slate-500">{note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizations */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-5">Organizations That Help</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {organizations.map(({ name, focus, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="card hover:shadow-md hover:border-hope-200 transition-all group flex items-start gap-3"
            >
              <Shield className="w-5 h-5 text-hope-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-800 text-sm group-hover:text-hope-700 transition-colors">{name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{focus}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* A personal note */}
      <section>
        <div className="bg-gradient-to-r from-hope-900 to-hope-700 rounded-2xl p-8 text-center">
          <Heart className="w-10 h-10 text-rose-300 fill-rose-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">A Note to Every Parent Reading This</h2>
          <p className="text-hope-200 leading-relaxed max-w-xl mx-auto text-sm">
            The fact that you&apos;re researching, preparing, and looking for ways to help your child — that is already
            love in action. You are doing everything right. The road ahead has hard days, but it also has remarkable
            moments of connection, resilience, and strength you didn&apos;t know you had.
            <strong className="text-white"> Your child is lucky to have you fighting for them.</strong>
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/chat" className="inline-flex items-center gap-2 bg-white text-hope-700 font-bold px-6 py-3 rounded-xl hover:bg-hope-50 transition-colors text-sm">
              <MessageCircleHeart className="w-4 h-4" />
              Talk to HopePulse AI
            </Link>
            <Link href="/analysis" className="inline-flex items-center gap-2 border border-hope-400 text-white font-semibold px-6 py-3 rounded-xl hover:bg-hope-700/50 transition-colors text-sm">
              Understand the Diagnosis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

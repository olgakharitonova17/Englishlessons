import { useEffect, useState } from 'react'
import './App.css'

type Course = { id: string; title: string; level: string; modules: number; tone: string; accent: string; illustration: string }
type ModuleId = number | 'Starter'
type View = { page: 'home' } | { page: 'course'; course: Course } | { page: 'module'; course: Course; module: ModuleId } | { page: 'lesson'; course: Course; module: ModuleId; lesson: string }

const courses: Course[] = [
  { id: 'starlight-4', title: 'Starlight 4', level: 'Primary', modules: 8, tone: '#fff1f2', accent: '#ff5364', illustration: 'rocket' },
  { id: 'starlight-6', title: 'Starlight 6', level: 'Elementary', modules: 8, tone: '#fff8e7', accent: '#f5ac16', illustration: 'planet' },
  { id: 'starlight-7', title: 'Starlight 7', level: 'Pre-intermediate', modules: 8, tone: '#f5f0ff', accent: '#8154e8', illustration: 'globe' },
  { id: 'spotlight-7', title: 'Spotlight 7', level: 'Pre-intermediate', modules: 10, tone: '#fff0f3', accent: '#b91543', illustration: 'books' },
]
const lessons = ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Revision', 'Test']
const toBeQuestions = [
  { before: 'What ', answer: 'is', after: ' your name?' },
  { before: 'How old ', answer: 'are', after: ' you?' },
  { before: 'Where ', answer: 'are', after: ' you from?' },
  { before: 'Where ', answer: 'is', after: ' Mark from?' },
  { before: 'Emma ', answer: 'is', after: ' from Poland.' },
  { before: 'Maria and Lucas ', answer: 'are', after: ' from Spain.' },
  { before: 'You ', answer: 'are', after: ' from Russia.' },
  { before: 'Uncle Fergus ', answer: 'is', after: ' short and fat.' },
  { before: 'My cousins ', answer: 'are', after: ' slim.' },
  { before: 'Aunt Mary ', answer: 'is', after: ' beautiful.' },
  { before: 'I ', answer: 'am', after: ' short and slim.' },
  { before: "My country's flag ", answer: 'is', after: ' white, blue and red.' },
]

function BookLogo() {
  return <svg className="book-logo" viewBox="0 0 44 38" aria-hidden="true"><path d="M3 5.5c7-2.2 13.2-.8 18 3.2v25C16.2 30.8 10.2 30 3 32V5.5Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/><path d="M41 5.5c-7-2.2-13.2-.8-18 3.2v25c4.8-2.9 10.8-3.7 18-1.7V5.5Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/><path d="M34 5v11l3-2 3 2V6" fill="#ff4e5b"/></svg>
}
function ArrowIcon() { return <span aria-hidden="true">→</span> }
function CourseArt({ kind }: { kind: string }) {
  return <div className={`course-art course-art--${kind}`} aria-hidden="true"><span className="art-orbit"/><span className="art-shape">{kind === 'rocket' ? '✦' : kind === 'planet' ? '◒' : kind === 'globe' ? '◎' : 'A'}</span><span className="art-dot art-dot--one"/><span className="art-dot art-dot--two"/></div>
}
function Header({ goHome }: { goHome: () => void }) {
  return <header className="site-header"><button className="brand" onClick={goHome} aria-label="Englishlessons — home"><BookLogo/><span>Englishlessons</span></button><div className="progress-note"><span>Small steps</span><strong>make big progress!</strong><i>★</i></div></header>
}
function Home({ openCourse }: { openCourse: (course: Course) => void }) {
  return <main>
    <section className="hero-panel"><div className="hero-copy"><span className="eyebrow">Your English learning space</span><h1>Welcome to<br/>Englishlessons!</h1><p>Choose your course and learn step by step<br className="desktop-only"/> with clear lessons and fun practice.</p><div className="hero-pills"><span>Learn</span><span>Practise</span><span>Grow</span></div></div><div className="hero-doodle" aria-hidden="true"><span className="doodle-star">☆</span><span className="doodle-bubble">•••</span><span className="doodle-abc">A B C</span><svg viewBox="0 0 390 220"><path d="M42 28c55 20 29 76 88 76s87 4 75 50 79 56 142 5"/><path d="M235 132c-40-30-73 25-27 43"/></svg><div className="open-book"><BookLogo/></div></div></section>
    <section className="courses-section"><div className="section-heading"><div><span className="eyebrow">Start learning</span><h2>Choose your course</h2></div><p>Four courses, one exciting journey</p></div><div className="course-grid">{courses.map(course => <article className="course-card" style={{ '--tone': course.tone, '--accent': course.accent } as React.CSSProperties} key={course.id}><div className="course-card__top"><span className="level-tag">{course.level}</span><CourseArt kind={course.illustration}/></div><div className="course-card__body"><span>{course.modules} modules</span><h3>{course.title}</h3><button onClick={() => openCourse(course)}>Open course <ArrowIcon/></button></div></article>)}</div></section>
  </main>
}
function Breadcrumbs({ view, setView }: { view: Exclude<View, { page: 'home' }>; setView: (view: View) => void }) {
  const moduleTitle = view.page !== 'course' && (view.module === 'Starter' ? 'Starter' : `Module ${view.module}`)
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><button onClick={() => setView({ page: 'home' })}>Courses</button><span>›</span>{view.page !== 'course' && <><button onClick={() => setView({ page: 'course', course: view.course })}>{view.course.title}</button><span>›</span></>}{view.page === 'lesson' && <><button onClick={() => setView({ page: 'module', course: view.course, module: view.module })}>{moduleTitle}</button><span>›</span></>}<strong>{view.page === 'course' ? view.course.title : view.page === 'module' ? moduleTitle : view.lesson}</strong></nav>
}
function PageIntro({ kicker, title, text, accent }: { kicker: string; title: string; text: string; accent: string }) {
  return <section className="page-intro" style={{ '--accent': accent } as React.CSSProperties}><div><span className="eyebrow">{kicker}</span><h1>{title}</h1><p>{text}</p></div><div className="intro-mark" aria-hidden="true">Aa<span>✦</span></div></section>
}
function CoursePage({ course, setView }: { course: Course; setView: (view: View) => void }) {
  const modules: ModuleId[] = ['Starter', ...Array.from({ length: course.modules }, (_, i) => i + 1)]
  return <main className="inner-page"><Breadcrumbs view={{ page: 'course', course }} setView={setView}/><PageIntro kicker={course.level} title={course.title} text="Choose a module and continue your English journey." accent={course.accent}/><section className="content-section"><div className="section-heading"><div><span className="eyebrow">Course content</span><h2>Modules</h2></div><p>Starter + {course.modules} learning modules</p></div><div className="module-grid">{modules.map(module => <button className={`module-card${module === 'Starter' ? ' module-card--starter' : ''}`} key={module} onClick={() => setView({ page: 'module', course, module })}><span className="module-number">{module === 'Starter' ? '★' : String(module).padStart(2, '0')}</span><span><small>{module === 'Starter' ? 'Start here' : module === course.modules ? 'Final module' : 'Learning module'}</small><strong>{module === 'Starter' ? 'Starter' : `Module ${module}`}</strong></span><i><ArrowIcon/></i></button>)}</div></section></main>
}
function ModulePage({ course, module, setView }: { course: Course; module: ModuleId; setView: (view: View) => void }) {
  const moduleTitle = module === 'Starter' ? 'Starter' : `Module ${module}`
  return <main className="inner-page"><Breadcrumbs view={{ page: 'module', course, module }} setView={setView}/><PageIntro kicker={course.title} title={moduleTitle} text="Work through the lessons, then check your progress." accent={course.accent}/><section className="content-section"><div className="section-heading"><div><span className="eyebrow">Module content</span><h2>Lessons</h2></div><p>Learn at your own pace</p></div><div className="lesson-list">{lessons.map((lesson, index) => <button className="lesson-card" key={lesson} onClick={() => setView({ page: 'lesson', course, module, lesson })}><span className={`lesson-icon lesson-icon--${index}`} aria-hidden="true">{index < 3 ? index + 1 : index === 3 ? '↻' : '✓'}</span><span><small>{index < 3 ? 'Core lesson' : index === 3 ? 'Review everything' : 'Check your knowledge'}</small><strong>{lesson}</strong></span><i><ArrowIcon/></i></button>)}</div></section></main>
}

function ToBeTrainer() {
  const [order, setOrder] = useState(() => [...toBeQuestions].sort(() => Math.random() - 0.5))
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const question = order[index]

  useEffect(() => {
    if (finished) return
    const timer = window.setInterval(() => setSeconds(value => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [finished])

  const reset = () => {
    setOrder([...toBeQuestions].sort(() => Math.random() - 0.5))
    setIndex(0); setSelected(null); setChecked(false); setScore(0); setFinished(false); setSeconds(0)
  }
  const check = () => {
    if (!selected || checked) return
    setChecked(true)
    if (selected === question.answer) setScore(value => value + 1)
  }
  const next = () => {
    if (!checked) return
    if (index === order.length - 1) { setFinished(true); return }
    setIndex(value => value + 1); setSelected(null); setChecked(false)
  }
  const back = () => {
    if (index === 0) return
    setIndex(value => value - 1); setSelected(null); setChecked(false)
  }
  const listen = () => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const voice = new SpeechSynthesisUtterance(question.before + question.answer + question.after)
    voice.lang = 'en-GB'; voice.rate = 0.88
    window.speechSynthesis.speak(voice)
  }
  const time = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

  return <section className="trainer-section">
    <div className="trainer-heading"><div><span className="eyebrow">Interactive practice</span><h2>The verb “to be”</h2></div><span className="trainer-badge">12 questions</span></div>
    <div className="trainer-card">
      {finished ? <div className="trainer-result"><span>🎉</span><h3>Well done!</h3><strong>{score} / {order.length} correct</strong><p>Time: {time}</p><button onClick={reset}>Try again</button></div> : <>
        <div className="trainer-top"><strong>Question {index + 1} of {order.length}</strong><span>{time}</span></div>
        <div className="trainer-progress"><span style={{ width: `${((index + 1) / order.length) * 100}%` }}/></div>
        <div className="trainer-question"><p>{question.before}<span>{checked && selected === question.answer ? question.answer : '___'}</span>{question.after}</p><button onClick={listen} disabled={!checked || selected !== question.answer}>🔊 Listen</button></div>
        <div className="trainer-answers">{['am', 'is', 'are'].map(answer => <button key={answer} disabled={checked} className={`${selected === answer ? 'selected' : ''} ${checked && answer === question.answer ? 'correct' : ''} ${checked && selected === answer && answer !== question.answer ? 'wrong' : ''}`} onClick={() => setSelected(answer)}>{answer}</button>)}</div>
        <p className={`trainer-feedback ${checked ? selected === question.answer ? 'good' : 'bad' : ''}`}>{checked ? selected === question.answer ? 'Correct! ✓' : `Not quite. The correct answer is “${question.answer}”.` : ''}</p>
        <div className="trainer-controls"><button onClick={back} disabled={index === 0}>← Back</button><button className="check" onClick={check} disabled={!selected || checked}>Check</button><button className="next" onClick={next} disabled={!checked}>{index === order.length - 1 ? 'Result →' : 'Next →'}</button></div>
      </>}
    </div>
  </section>
}

function EnglishPracticePack() {
  return <section className="practice-pack">
    <div className="trainer-heading"><div><span className="eyebrow">More practice</span><h2>English Practice</h2></div><span className="trainer-badge">5 exercises</span></div>
    <iframe
      className="practice-frame"
      src={`${import.meta.env.BASE_URL}trainers/english-practice-5-exercises.html`}
      title="English Practice — 5 exercises"
      loading="lazy"
      allow="autoplay"
    />
  </section>
}

function EnchantedElvesTrainer() {
  return <section className="practice-pack">
    <div className="trainer-heading"><div><span className="eyebrow">Appearance practice</span><h2>Enchanted Elves</h2></div><span className="trainer-badge">4 exercises</span></div>
    <iframe
      className="practice-frame practice-frame--elves"
      src={`${import.meta.env.BASE_URL}trainers/enchanted-elves-appearance.html`}
      title="Enchanted Elves — Appearance Adventure"
      loading="lazy"
      allow="autoplay"
    />
  </section>
}

function PhonicsTrainer() {
  return <section className="practice-pack">
    <div className="trainer-heading"><div><span className="eyebrow">Pronunciation practice</span><h2>Listen, Say & Sort</h2></div><span className="trainer-badge">Phonics</span></div>
    <iframe
      className="practice-frame practice-frame--phonics"
      src={`${import.meta.env.BASE_URL}trainers/phonics-speaking-and-sorting.html`}
      title="English Sounds — Speaking Cards and Sorting"
      loading="lazy"
      allow="autoplay"
    />
  </section>
}

function LikesAndAppearanceTrainer() {
  return <section className="practice-pack">
    <div className="trainer-heading"><div><span className="eyebrow">Likes &amp; appearance practice</span><h2>Enchanted Elves</h2></div><span className="trainer-badge">2 exercises</span></div>
    <iframe
      className="practice-frame practice-frame--elves"
      src={`${import.meta.env.BASE_URL}trainers/enchanted-elves-likes-and-appearance.html`}
      title="Enchanted Elves — Likes and Appearance"
      loading="lazy"
      allow="autoplay"
    />
  </section>
}

function LessonPage({ course, module, lesson, setView }: { course: Course; module: ModuleId; lesson: string; setView: (view: View) => void }) {
  const moduleTitle = module === 'Starter' ? 'Starter' : `Module ${module}`
  const isStarlightStarter = course.id === 'starlight-4' && module === 'Starter'
  return <main className="inner-page lesson-page"><Breadcrumbs view={{ page: 'lesson', course, module, lesson }} setView={setView}/><PageIntro kicker={`${course.title} · ${moduleTitle}`} title={lesson} text="Everything you need for today's English lesson." accent={course.accent}/>{isStarlightStarter && lesson === 'Lesson 1' && <><ToBeTrainer/><EnglishPracticePack/></>}{isStarlightStarter && lesson === 'Lesson 2' && <><EnchantedElvesTrainer/><PhonicsTrainer/></>}{isStarlightStarter && lesson === 'Lesson 3' && <LikesAndAppearanceTrainer/>}</main>
}
function App() {
  const [view, setView] = useState<View>({ page: 'home' })
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [view])
  return <div className="app-shell"><Header goHome={() => setView({ page: 'home' })}/>{view.page === 'home' && <Home openCourse={course => setView({ page: 'course', course })}/>} {view.page === 'course' && <CoursePage course={view.course} setView={setView}/>} {view.page === 'module' && <ModulePage course={view.course} module={view.module} setView={setView}/>} {view.page === 'lesson' && <LessonPage course={view.course} module={view.module} lesson={view.lesson} setView={setView}/>}<footer><BookLogo/><span>Englishlessons</span><p>Small steps make big progress!</p></footer></div>
}
export default App

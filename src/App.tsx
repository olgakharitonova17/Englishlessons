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
const materialCards = [
  { title: 'Vocabulary', text: 'Learn and practise new words', icon: 'Aa', color: '#ff5364' },
  { title: 'Grammar', text: 'Rules, examples and exercises', icon: '{}', color: '#8154e8' },
  { title: 'Reading', text: 'Read the text and answer questions', icon: '≡', color: '#f5ac16' },
  { title: 'Listening', text: 'Listen and complete the tasks', icon: '♫', color: '#2b83e6' },
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
  return <main className="inner-page"><Breadcrumbs view={{ page: 'course', course }} setView={setView}/><PageIntro kicker={course.level} title={course.title} text="Choose a module and continue your English journey." accent={course.accent}/><section className="content-section"><div className="section-heading"><div><span className="eyebrow">Course content</span><h2>Modules</h2></div><p>Starter + {course.modules} learning modules</p></div><div className="module-grid">{modules.map(module => <button className={`module-card${module === 'Starter' ? ' module-card--starter' : ''}`} key={module} onClick={() => setView({ page: 'module', course, module })}><span className="module-number">{module === 'Starter' ? '★' : String(module).padStart(2, '0')}</span><span><small>{module === 'Starter' ? 'Start here' : module === course.modules ? 'Final module' : 'Learning module'}</small><strong>{module === 'Starter' ? 'Starter' : `Module ${module}`}</strong><em>5 lessons</em></span><i><ArrowIcon/></i></button>)}</div></section></main>
}
function ModulePage({ course, module, setView }: { course: Course; module: ModuleId; setView: (view: View) => void }) {
  const moduleTitle = module === 'Starter' ? 'Starter' : `Module ${module}`
  return <main className="inner-page"><Breadcrumbs view={{ page: 'module', course, module }} setView={setView}/><PageIntro kicker={course.title} title={moduleTitle} text="Work through the lessons, then check your progress." accent={course.accent}/><section className="content-section"><div className="section-heading"><div><span className="eyebrow">Module content</span><h2>Lessons</h2></div><p>Learn at your own pace</p></div><div className="lesson-list">{lessons.map((lesson, index) => <button className="lesson-card" key={lesson} onClick={() => setView({ page: 'lesson', course, module, lesson })}><span className={`lesson-icon lesson-icon--${index}`} aria-hidden="true">{index < 3 ? index + 1 : index === 3 ? '↻' : '✓'}</span><span><small>{index < 3 ? 'Core lesson' : index === 3 ? 'Review everything' : 'Check your knowledge'}</small><strong>{lesson}</strong></span><i><ArrowIcon/></i></button>)}</div></section></main>
}
function LessonPage({ course, module, lesson, setView }: { course: Course; module: ModuleId; lesson: string; setView: (view: View) => void }) {
  const moduleTitle = module === 'Starter' ? 'Starter' : `Module ${module}`
  return <main className="inner-page"><Breadcrumbs view={{ page: 'lesson', course, module, lesson }} setView={setView}/><PageIntro kicker={`${course.title} · ${moduleTitle}`} title={lesson} text="Everything you need for today's English lesson." accent={course.accent}/><section className="content-section"><div className="section-heading"><div><span className="eyebrow">Lesson materials</span><h2>Let's learn</h2></div><p>Open a section to get started</p></div><div className="materials-grid">{materialCards.map(item => <button className="material-card" key={item.title} style={{ '--material': item.color } as React.CSSProperties}><span className="material-icon">{item.icon}</span><span><strong>{item.title}</strong><small>{item.text}</small></span><i><ArrowIcon/></i></button>)}</div><div className="homework-card"><span className="homework-icon">✓</span><div><span className="eyebrow">After the lesson</span><h2>Homework</h2><p>Complete the tasks and practise what you learned today.</p></div><button>Open homework <ArrowIcon/></button></div></section></main>
}
function App() {
  const [view, setView] = useState<View>({ page: 'home' })
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [view])
  return <div className="app-shell"><Header goHome={() => setView({ page: 'home' })}/>{view.page === 'home' && <Home openCourse={course => setView({ page: 'course', course })}/>} {view.page === 'course' && <CoursePage course={view.course} setView={setView}/>} {view.page === 'module' && <ModulePage course={view.course} module={view.module} setView={setView}/>} {view.page === 'lesson' && <LessonPage course={view.course} module={view.module} lesson={view.lesson} setView={setView}/>}<footer><BookLogo/><span>Englishlessons</span><p>Small steps make big progress!</p></footer></div>
}
export default App

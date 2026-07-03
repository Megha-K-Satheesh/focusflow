import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  Code2,
  Mic,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

import Footer from "../../components/ui/Footer";
import Navbar from "../../components/ui/Navbar";

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: "AI Study Plans",
      description:
        "Generate personalized study roadmaps based on your goal, skill level, and target outcome.",
    },
    {
      icon: CheckCircle2,
      title: "Progress Tracking",
      description:
        "Track your learning journey by completing daily tasks and monitoring your overall progress.",
    },
    {
      icon: Target,
      title: "AI Mock Interviews",
      description:
        "Practice custom interviews or interviews generated from your completed study plan topics.",
    },
    {
      icon: Sparkles,
      title: "Instant AI Feedback",
      description:
        "Receive scores, strengths, improvement suggestions, and explanations after every answer.",
    },
    {
      icon: Mic,
      title: "Voice Answers",
      description:
        "Answer questions naturally using your voice with automatic speech-to-text transcription.",
    },
    {
      icon: Clock,
      title: "Interview History",
      description:
        "Resume unfinished interviews and review your previous interview performance anytime.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-100 pt-24 mt-10">
        <div className="mx-auto max-w-7xl px-6 py-12">
     
          <section className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
              <Sparkles size={16} />
              AI Powered Learning Platform
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
              Learn Smarter with
              <span className="block bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                FocusFlow
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              FocusFlow helps developers prepare for technical interviews with
              personalized AI study plans, progress tracking, intelligent mock
              interviews, and detailed AI-powered feedback—all in one place.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
              >
                Go to Dashboard
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/study-plan/create"
                className="rounded-xl border border-violet-200 bg-white px-6 py-3 font-semibold text-violet-600 transition hover:bg-violet-50"
              >
                Create Study Plan
              </Link>
            </div>
          </section>

         
          <section className="mt-24 grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Everything you need to prepare for interviews
              </h2>

              <p className="mt-6 text-gray-600 leading-8">
                FocusFlow combines AI-powered study planning with interview
                preparation so you can stay focused on learning instead of
                managing multiple tools. Build a personalized roadmap, complete
                daily learning tasks, practice realistic interviews, and improve
                using actionable AI feedback.
              </p>
            </div>

            <div className="rounded-3xl border border-violet-100 bg-white p-8 shadow-xl shadow-violet-100/50">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-violet-600" />
                  <span>Personalized learning roadmap</span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-violet-600" />
                  <span>Track completed study tasks</span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-violet-600" />
                  <span>Practice AI mock interviews</span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-violet-600" />
                  <span>Receive detailed AI evaluation</span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-violet-600" />
                  <span>Resume interviews anytime</span>
                </div>
              </div>
            </div>
          </section>

          
          <section className="mt-24">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Powerful Features
              </h2>

              <p className="mt-3 text-gray-600">
                Everything you need for structured learning and interview
                preparation.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                      <Icon className="text-violet-600" size={22} />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

        
          <section className="mt-24 rounded-3xl bg-gradient-to-r from-violet-600 to-purple-600 p-10 text-white">
            <h2 className="text-center text-3xl font-bold">
              How FocusFlow Works
            </h2>

            <div className="mt-10 grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
                  1
                </div>

                <h3 className="mt-4 font-semibold">
                  Create a Study Plan
                </h3>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
                  2
                </div>

                <h3 className="mt-4 font-semibold">
                  Complete Daily Tasks
                </h3>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
                  3
                </div>

                <h3 className="mt-4 font-semibold">
                  Practice Interviews
                </h3>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-xl font-bold">
                  4
                </div>

                <h3 className="mt-4 font-semibold">
                  Improve with AI Feedback
                </h3>
              </div>
            </div>
          </section>

         
          <section className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Built With Modern Technologies
            </h2>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                "React",
                "Redux Toolkit",
                "Node.js",
                "Express",
                "MongoDB",
                "JWT",
                "Tailwind CSS",
                "Google Gemini AI",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-violet-100 px-5 py-2 text-sm font-medium text-violet-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

        
          <section className="mt-24 rounded-3xl border border-violet-100 bg-white p-12 text-center shadow-lg">
            <Code2
              className="mx-auto mb-6 rounded-2xl bg-violet-100 p-3 text-violet-600"
              size={64}
            />

            <h2 className="text-3xl font-bold text-gray-900">
              Ready to Become Interview Ready?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Create your personalized study plan, track your progress, practice
              AI-powered mock interviews, and improve with intelligent feedback.
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

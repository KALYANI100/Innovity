"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg"
            />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              InnoVity
            </h1>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login" className="px-4 py-2 text-purple-600 hover:text-purple-800 transition-colors">
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Sign Up
            </Link>
          </div>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
              Unleash Your <span className="text-purple-600">Creativity</span> and{" "}
              <span className="text-indigo-600">Knowledge</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A fun, engaging platform for students to showcase creativity, build knowledge, and participate in exciting
              competitions.
            </p>
            <motion.div
              className="mt-8 flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/auth/signup"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg flex items-center gap-2 hover:shadow-lg transition-shadow group"
              >
                Get Started
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full h-[400px]">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl transform rotate-3"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: "Study", color: "bg-blue-100", icon: "📚" },
                      { name: "Create", color: "bg-purple-100", icon: "🎨" },
                      { name: "Innovate", color: "bg-indigo-100", icon: "💡" },
                    ].map((corner, index) => (
                      <motion.div
                        key={corner.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.2 }}
                        whileHover={{ y: -5, scale: 1.05 }}
                        className={`${corner.color} p-4 rounded-xl flex flex-col items-center justify-center aspect-square shadow-sm`}
                      >
                        <span className="text-3xl mb-2">{corner.icon}</span>
                        <span className="font-medium">{corner.name}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-6 bg-gray-100 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs">
                        AI
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">
                          Hi there! I'm your AI study assistant. How can I help you today?
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="mt-6 h-10 bg-gray-100 rounded-full flex items-center px-4"
                  >
                    <span className="text-gray-400 text-sm">Ask me anything...</span>
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute -bottom-10 -right-10 w-24 h-24 bg-yellow-200 rounded-full flex items-center justify-center text-4xl"
            >
              🏆
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800">Explore Our Corners</h3>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Study Corner",
                icon: "📚",
                color: "from-blue-500 to-cyan-500",
                description: "Access study materials, get help from our AI assistant, and expand your knowledge.",
              },
              {
                title: "Creativity Corner",
                icon: "🎨",
                color: "from-purple-500 to-pink-500",
                description: "Showcase your talents in painting, dance, photography, singing, and cooking.",
              },
              {
                title: "Innovation Corner",
                icon: "💡",
                color: "from-amber-500 to-orange-500",
                description: "Share your innovative ideas and projects with the community.",
              },
            ].map((corner, index) => (
              <motion.div
                key={corner.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${corner.color}`}></div>
                <div className="p-6">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-4">
                    {corner.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{corner.title}</h4>
                  <p className="text-gray-600 mb-4">{corner.description}</p>
                  <div className="mt-auto">
                    <Link
                      href={`/dashboard/${corner.title.split(" ")[0].toLowerCase()}`}
                      className="inline-flex items-center text-sm font-medium text-purple-600 group-hover:text-purple-800"
                    >
                      Explore
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      >
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </motion.span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

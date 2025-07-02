'use client'

import React, { useState } from 'react'
import {
  Button,
  TextField,
  Chip,
  InputAdornment
} from '@mui/material'
import { Search } from '@mui/icons-material'

const LandingPage: React.FC = () => {
  const [isNight, setIsNight] = useState(false)

  const popularTopics = [
    'Web Development',
    'Data Science',
    'Machine Learning',
    'Design',
    'Business'
  ]

  const handleLogoClick = () => {
    setIsNight(!isNight)
  }

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${isNight ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white shadow-md z-50 animate-slideDown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div
              className="flex items-center gap-2 cursor-pointer transform hover:scale-105 transition-transform"
              onClick={handleLogoClick}
            >
              <h1 className="text-3xl font-bold text-purple-600">
                Learn<span className="text-green-500">Mate</span>
              </h1>
              <span className="text-sm">📚</span>
            </div>

            <div className="flex gap-3">
              <Button
                variant="text"
                className="text-gray-600 hover:text-purple-600 normal-case"
                sx={{
                  borderRadius: '25px',
                  px: 3,
                  '&:hover': { transform: 'translateY(-2px)' }
                }}
              >
                Login / Register
              </Button>
              <Button
                variant="contained"
                className="normal-case"
                sx={{
                  backgroundColor: '#ffeaa7',
                  color: '#2d3436',
                  borderRadius: '25px',
                  px: 3,
                  boxShadow: '0 4px 15px rgba(255, 234, 167, 0.4)',
                  '&:hover': {
                    backgroundColor: '#fdcb6e',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(255, 234, 167, 0.6)'
                  }
                }}
              >
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-block bg-pink-400 text-white px-6 py-2 rounded-full text-sm mb-8 animate-pulse">
          Trusted & loved by 2 million learners
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 animate-fadeInUp">
          Find your perfect learning path<br />Courses & Mentors
        </h1>

        <p className="text-xl text-gray-600 mb-12 animate-fadeInUp animation-delay-200">
          Discover courses that match your goals with the right instructors
        </p>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-8 animate-fadeInUp animation-delay-400">
          <TextField
            fullWidth
            placeholder="Search Courses, Topics, or Skills..."
            variant="outlined"
            className="bg-white rounded-full"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="text-gray-400" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '50px',
                '& fieldset': {
                  border: 'none',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                },
                '&:hover fieldset': {
                  boxShadow: '0 15px 50px rgba(0,0,0,0.12)'
                },
                '&.Mui-focused': {
                  transform: 'translateY(-2px)',
                  '& fieldset': {
                    boxShadow: '0 15px 50px rgba(0,0,0,0.12)'
                  }
                }
              }
            }}
          />
        </div>

        {/* Popular Topics */}
        <div className="mb-12 animate-fadeInUp animation-delay-600">
          <p className="text-sm text-gray-600 mb-3">Popular Topics:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularTopics.map((topic) => (
              <Chip
                key={topic}
                label={topic}
                clickable
                className="bg-white text-purple-600 hover:bg-purple-600 hover:text-white transform hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md"
                sx={{
                  fontSize: '0.9rem',
                  padding: '0.5rem',
                  '&:hover': {
                    backgroundColor: '#6c5ce7',
                    color: 'white',
                    boxShadow: '0 5px 20px rgba(108, 92, 231, 0.3)'
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Illustration Container */}
        <div className={`relative h-96 mt-16 overflow-hidden transition-all duration-500 ${isNight
          ? 'bg-gradient-to-b from-gray-800 to-gray-700'
          : 'bg-gradient-to-b from-transparent to-blue-50'
          }`}>
          {/* Clouds */}
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>

          {/* Buildings */}
          <div className={`building house1 hover:scale-105 hover-brightness-120 ${isNight ? 'night' : ''}`}></div>
          <div className={`building building2 hover:scale-105 hover-brightness-120 ${isNight ? 'night' : ''}`}></div>
          <div className={`building building3 hover:scale-105 hover-brightness-120 ${isNight ? 'night' : ''}`}></div>
          <div className={`building house4 hover:scale-105 hover-brightness-120 ${isNight ? 'night' : ''}`}></div>
          <div className={`building building5 hover:scale-105 hover-brightness-120 ${isNight ? 'night' : ''}`}></div>
        </div>
      </main>
    </div>
  )
}

export default LandingPage
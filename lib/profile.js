import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const profilesDirectory = path.join(process.cwd(), '_profilesdata')

export function getSortedProfilesData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(profilesDirectory)
  const allProfilesData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const userId = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(profilesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      userId,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allProfilesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllProfileIds() {
  const fileNames = fs.readdirSync(profilesDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        userId: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export function getProfileData(userId) {
  const fullPath = path.join(profilesDirectory, `${userId}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    userId,
    ...matterResult.data
  }
}
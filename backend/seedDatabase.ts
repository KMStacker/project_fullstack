import dotenv from 'dotenv'
dotenv.config()
import { connectDb, sequelize } from './utils/db'
import Project from './models/project'
import Skill from './models/skill'
import * as logger from './utils/logger'

const seedDatabase = async (): Promise<void> => {
  try {
    logger.info('Connecting to db for seeding...')
    await connectDb()
    logger.info('Connected to db!')

    logger.info('Checking for existing projects...')
    const projectCount = await Project.count()
    if (projectCount === 0) {
      logger.info('Seeding initial projects...')
      await Project.bulkCreate([
        {
          title: 'My-CV Fullstack Application',
          description: 'A comprehensive portfolio web application with a custom admin panel, reactive layout themes, and a visitor guestbook.',
          technologies: 'React, TypeScript, Node.js, Express, PostgreSQL',
          githubUrl: 'https://github.com/KMStacker/project_fullstack'
        },
        {
          title: 'Party Planner App',
          description: 'An app for planning parties with friends.',
          technologies: 'Python, HTML, CSS',
          githubUrl: 'https://github.com/KMStacker/party-planner'
        }
      ])
      logger.info('Projects seeded successfully.')
    } else {
      logger.info('Projects already exist. Skipping seed.')
    }

    logger.info('Checking for existing skills...')
    const skillCount = await Skill.count()
    if (skillCount === 0) {
      logger.info('Seeding initial skills...')
      await Skill.bulkCreate([
        {
          name: 'TypeScript',
          level: 'Advanced',
          usedOn: 'Frontend & Backend'
        },
        {
          name: 'React',
          level: 'Advanced',
          usedOn: 'Frontend'
        },
        {
          name: 'PostgreSQL',
          level: 'Advanced',
          usedOn: 'Backend'
        },
        {
          name: 'Golang',
          level: 'Intermediate',
          usedOn: 'Backend'
        },
        {
          name: 'Python',
          level: 'Intermediate',
          usedOn: 'Frontend & Backend'
        }

      ])
      logger.info('Skills seeded successfully.')
    } else {
      logger.info('Skills already exist. Skipping seed.')
    }

    logger.info('Database seeding completed successfully!')
  } catch (error: any) {
    logger.error('Error seeding database:', error.message)
  } finally {
    logger.info('Closing db connection...')
    await sequelize.close()
    logger.info('Db connection closed!')
  }
}

void seedDatabase()
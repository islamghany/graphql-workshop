const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function createContext(request) {
  return { request,prisma }
}

module.exports = {
  createContext
}
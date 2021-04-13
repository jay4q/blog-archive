import fs from 'fs'
import { join } from 'path'

const consolePath = join(process.cwd(), 'public/console.txt')

export const getConsoleTxt = () => {
  try {
    const res = fs.readFileSync(consolePath, 'utf8')
    return res
  } catch (e) {
    return 'jay4q'
  }
}
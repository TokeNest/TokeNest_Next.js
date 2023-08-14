import dbConnect from '@/lib/dbconnect'
import { UserModel } from '@/models'
import { NextResponse } from 'next/server'

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: 사용자 추가, 수정, 삭제, 조회
 *
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *    tags:
 *      - 'Users'
 *    summary: '유저 리스트 반환'
 *    description: nice
 *    parameters: ''
 *    responses:
 *      200:
 *        description: 유저 리스트 반환
 */
export async function GET(request: Request) {
  await dbConnect()
  const users = await UserModel.find({}).limit(10).lean()
  return NextResponse.json(users)
}

/**
 * @swagger
 * /api/user:
 *   post:
 *    tags:
 *      - 'Users'
 *    summary: '유저 등록'
 *    description: nice
 *    parameters: ''
 *    responses:
 *      200:
 *        description: 유저 등록 완료
 */
export async function POST(request: Request) {
  await dbConnect()
  var user = new UserModel({
    name: '최형택',
  })
  await user.save()

  return NextResponse.json(user.toJSON())
}

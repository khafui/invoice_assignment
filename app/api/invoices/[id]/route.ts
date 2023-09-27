import connectMongoDB from "@/db/mongodb";
import Invoice from "@/model/invoice";
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, { params }: any){
    const {id} =  params;
    await connectMongoDB();
    const invoice = await Invoice.findOne({_id: id});
    return NextResponse.json({invoice}, {status: 200})
}
import connectMongoDB from '@/db/mongodb';
import Invoice from '@/model/invoice';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const {
    businessName,
    businessSlogan,
    businessAddress,
    businessContact,
    businessEmail,
    invoiceTo,
    invoiceDate,
    clientContact,
    clientAddress,
    cashOrChequeNo,
    additionalInfo,
    name,
    signature,
    list,
    total,
    vat,
    sumTotal,
    balance,
    amountPaid,
    img,
  } = await request.json();
  await connectMongoDB();
  await Invoice.create({
    businessName,
    businessSlogan,
    businessAddress,
    businessContact,
    businessEmail,
    invoiceTo,
    invoiceDate,
    clientContact,
    clientAddress,
    cashOrChequeNo,
    additionalInfo,
    name,
    signature,
    list,
    total,
    vat,
    sumTotal,
    balance,
    amountPaid,
    img,
  });
  return NextResponse.json({ message: 'Invoice Created' }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const invoices = await Invoice.find();
  return NextResponse.json(
    { message: 'Invoices Retrived Successfull', invoices },
    { status: 200 }
  );
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  await connectMongoDB();
  await Invoice.findByIdAndDelete(id);
  return NextResponse.json(
    { message: 'Invoice Deleted Successful' },
    { status: 200 }
  );
}

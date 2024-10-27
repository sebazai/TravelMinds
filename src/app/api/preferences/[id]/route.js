import { connectToDataBase } from '@/app/lib/db';
import { Preference } from '@/models/Preference';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    const preference = await Preference.findById(params.id).populate('createdBy');
    if (!preference) {
      return NextResponse.json({ error: 'Preference not found' }, { status: 404 });
    }
    return NextResponse.json(preference);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//Example Postman
// {
//   "title": "putPreference",
//   "description": "putDescription",
//   "icon": "putIcon",
//   "createdBy": "putUser"
// }
export async function PUT(request, { params }) {
  try {
    await connectToDataBase();
    const data = await request.json();
    const preference = await Preference.findByIdAndUpdate(params.id, data, { new: true });
    if (!preference) {
      return NextResponse.json({ error: 'Preference not found' }, { status: 404 });
    }
    return NextResponse.json(preference);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDataBase();
    const preference = await Preference.findById(params.id);
    
    if (!preference) {
      return NextResponse.json({ error: 'Preference nort found' }, { status: 404 });
    }

    await User.findByIdAndUpdate(
      preference.createdBy,
      { $pull: { preferences: preference._id } }
    );

    await preference.deleteOne();
    
    return NextResponse.json({ message: 'Preference deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
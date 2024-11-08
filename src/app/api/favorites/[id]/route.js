import { connectToDataBase } from '@/app/lib/db';
import { Favorite } from '@/models/Favorite';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectToDataBase();
    const favorite = await Favorite.findById(params.id).populate('createdBy');
    
    if (!favorite) {
      return NextResponse.json({ error: 'Favorite not found' }, { status: 404 });
    }
    
    return NextResponse.json(favorite);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
  try {
    await connectToDataBase();
    const data = await request.json();
    const favorite = await Favorite.findByIdAndUpdate(params.id, data, { new: true });
    
    if (!favorite) {
      return NextResponse.json({ error: 'Favorite not found' }, { status: 404 });
    }
    
    return NextResponse.json(favorite);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDataBase();
    const favorite = await Favorite.findById(params.id);
    
    if (!favorite) {
      return NextResponse.json({ error: 'Favorite not found' }, { status: 404 });
    }

    await User.findByIdAndUpdate(
      favorite.createdBy,
      { $pull: { favorites: favorite._id } }
    );

    await favorite.deleteOne();
    
    return NextResponse.json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

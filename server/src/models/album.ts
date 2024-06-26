import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  album_id: String,
  rating: Number,
  title: String,
  artist: String,
  image_url: String,
  favourite: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

albumSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('Album', albumSchema)
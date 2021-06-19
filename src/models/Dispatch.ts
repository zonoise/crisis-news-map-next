import mongoose from 'mongoose';

interface IDispatch {
  originId: string;
  category: string;
  unit: string;
  detail: string;
  division: string;
  latitude: number;
  longitude: number;
  placeCity: string;
  placeCountry: string;
  placePref: string;
  status: string;
  time_str: string;
  observedAt: Date;
}

interface IDispatchModel extends IDispatch, mongoose.Document {}

const schema = new mongoose.Schema(
  {
    originId: String,
    category: String,
    unit: String,
    detail: String,
    division: String,
    latitude: Number,
    longitude: Number,
    placeCity: String,
    placeCountry: String,
    placePref: String,
    status: String,
    time_str: String,
    observedAt: Date,
  },
  { timestamps: true }
);

export const Dispatch =
  mongoose.models.Dispatch ||
  mongoose.model<IDispatchModel>('Dispatch', schema);

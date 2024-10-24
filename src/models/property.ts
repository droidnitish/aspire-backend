// src/models/property.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ITotalLivingRooms {
    yourUse: number;
    communal: number;
}

interface ITotalRooms {
    yourUse: number;
    communal: number;
}

interface IOtherInformation {
    bedsit: boolean;
    selfContainedFlat: boolean;
    quantityOfFloors: number;
    unfurnished: boolean;
    partFurnished: boolean;
    fullyFurnished: boolean;
    centralHeating: boolean;
    garden: boolean;
    garageParkingSpace: boolean;
    accommodationLocation: string;
    accommodationFloor: number;
    totalLivingRooms: ITotalLivingRooms;
    totalBedsitRooms: ITotalRooms;
    totalBedrooms: ITotalRooms;
    totalBathrooms: ITotalRooms;
    totalToilets: ITotalRooms;
    totalKitchens: ITotalRooms;
    totalOtherRooms: ITotalRooms;
}

interface IProperty extends Document {
    housingProvider: string;
    RSL: string;
    addressLine1: string;
    numberOfBedrooms: number;
    area: string;
    city: string;
    postCode: string;
    basicRent: number;
    totalServiceCharges: number;
    totalEligibleRent: number;
    weeklyIneligibleCharge: number;
    sharedWithOther: boolean;
    addedBy: string;
    otherInformation: IOtherInformation;
}

const PropertySchema: Schema = new Schema({
    housingProvider: { type: String, required: true },
    RSL: { type: String, required: true },
    addressLine1: { type: String, required: true },
    numberOfBedrooms: { type: Number, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    basicRent: { type: Number, required: true },
    totalServiceCharges: { type: Number, required: true },
    totalEligibleRent: { type: Number, required: true },
    weeklyIneligibleCharge: { type: Number, required: true },
    sharedWithOther: { type: Boolean, required: true },
    addedBy: {type: String, required: true},
    otherInformation: {
        bedsit: { type: Boolean, required: true },
        selfContainedFlat: { type: Boolean, required: true },
        quantityOfFloors: { type: Number, required: true },
        unfurnished: { type: Boolean, required: true },
        partFurnished: { type: Boolean, required: true },
        fullyFurnished: { type: Boolean, required: true },
        centralHeating: { type: Boolean, required: true },
        garden: { type: Boolean, required: true },
        garageParkingSpace: { type: Boolean, required: true },
        accommodationLocation: { type: String, required: true },
        accommodationFloor: { type: Number, required: true },
        totalLivingRooms: {
            yourUse: { type: Number, required: true },
            communal: { type: Number, required: true },
        },
        totalBedsitRooms: {
            yourUse: { type: Number, required: true },
            communal: { type: Number, required: true },
        },
        totalBedrooms: {
            yourUse: { type: Number, required: true },
            communal: { type: Number, required: true },
        },
        totalBathrooms: {
            yourUse: { type: Number, required: true },
            communal: { type: Number, required: true },
        },
        totalToilets: {
            yourUse: { type: Number, required: true },
            communal: { type: Number, required: true },
        },
        totalKitchens: {
            yourUse: { type: Number, required: true },
            communal: { type: Number, required: true },
        },
        totalOtherRooms: {
            yourUse: { type: Number, required: true },
            communal: { type: Number, required: true },
        },
    },
});

// Export the property model
export default mongoose.model<IProperty>('Property', PropertySchema);

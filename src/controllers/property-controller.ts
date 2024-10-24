// src/controllers/propertyController.ts
import { Request, Response, NextFunction } from 'express';
import Property from '../models/property';

export const addProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Destructure request body
    const {
        housingProvider,
        RSL,
        addressLine1,
        numberOfBedrooms,
        area,
        city,
        postCode,
        basicRent,
        totalServiceCharges,
        totalEligibleRent,
        weeklyIneligibleCharge,
        sharedWithOther,
        addedBy,
        otherInformation,
    } = req.body;

    try {
        const newProperty = new Property({
            housingProvider,
            RSL,
            addressLine1,
            numberOfBedrooms,
            area,
            city,
            postCode,
            basicRent,
            totalServiceCharges,
            totalEligibleRent,
            weeklyIneligibleCharge,
            sharedWithOther,
            addedBy,
            otherInformation,
        });

        await newProperty.save();
        res.status(201).json({ message: 'Property added successfully', property: newProperty });
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).json({ message: 'Failed to add property', error });
    }
};

// Controller to get all properties
export const getProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const properties = await Property.find(); // Fetch all properties from the database
        res.status(200).json({ message: 'Properties fetched successfully', properties });
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
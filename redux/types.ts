export interface Game {
    _id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    event: string;
    options: string[];
    startTime: Date;
    endTime: Date;
    currectOptions: number[];
    createdAt: Date;
    updatedAt: Date;
}

export interface GameSubmission {
    _id: string;
    gameId: string;
    userId: string;
    restaurantId: string;
    couponCode: string;
    tableNumber: string;
    userOptions: string[];
    createdAt: Date;
}

export interface CouponCode {
    _id: string;
    code: string;
    description: string;
    createdAt: Date;
}

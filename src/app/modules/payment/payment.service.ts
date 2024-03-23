import { SortOrder } from 'mongoose';

import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { IPayment, IPaymentFilters } from './payment.interface';
import { Payment } from './payment.model';
import { paymentSearchableFields } from './payment.constant';

const createPayment = async (payload: IPayment): Promise<IPayment | null> => {
  const result = await Payment.create(payload);

  return result;
};

const getAllPayment = async (
  filter: IPaymentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPayment[]> | null> => {
  //

  const { searchTerm, ...filterData } = filter;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: paymentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whareConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Payment.find(whareConditions)
    .populate('user')
    .populate('donation')
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  const total = await Payment.countDocuments(whareConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSinglePayment = async (id: string): Promise<IPayment | null> => {
  const result = await Payment.findById({ _id: id })
    .populate('user')
    .populate('donation');
  return result;
};

const updatePayment = async (
  id: string,
  paylaoad: Partial<IPayment>
): Promise<IPayment | null> => {
  const result = await Payment.findByIdAndUpdate({ _id: id }, paylaoad, {
    new: true,
  })
    .populate('user')
    .populate('donation');
  return result;
};

const deletePayment = async (id: string): Promise<IPayment | null> => {
  const result = await Payment.findByIdAndDelete({ _id: id });
  return result;
};
export const PaymentService = {
  createPayment,
  getAllPayment,
  getSinglePayment,
  updatePayment,
  deletePayment,
};

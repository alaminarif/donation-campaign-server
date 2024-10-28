import { Donation } from './donation.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { donorSearchableFields } from '../donor/donor.constant';
import { TDonation } from './donation.interface';

const createDonationIntoDB = async (payload: TDonation) => {
  const result = await Donation.create(payload);
  return result;
};

const getAllDonationFromDB = async (query: Record<string, unknown>) => {
  //

  const donationQuery = new QueryBuilder(Donation.find(), query)
    .search(donorSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await donationQuery.modelQuery;
  const meta = await donationQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleDonationFromDB = async (id: string) => {
  const result = await Donation.findById({ _id: id });
  return result;
};

const updateDonationIntoDB = async (
  id: string,
  paylaoad: Partial<TDonation>
) => {
  //
  const query = { user: id };
  const isExist = await Donation.findOne(query);
  // console.log('isExist : ', isExist);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user Not found');
  }
  const result = await Donation.findByIdAndUpdate(query, paylaoad, {
    new: true,
  }).populate('user');

  return result;
};

const deleteDonationFromDB = async (id: string) => {
  const result = await Donation.findByIdAndDelete({ _id: id });
  return result;
};

export const DonationService = {
  createDonationIntoDB,
  getAllDonationFromDB,
  getSingleDonationFromDB,
  updateDonationIntoDB,
  deleteDonationFromDB,
};

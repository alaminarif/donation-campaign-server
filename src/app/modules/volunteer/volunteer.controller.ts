import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import { VolunteerService } from './volunteer.service';
import sendResponse from '../../../utils/sendResponse';

const getAllvolunteers = catchAsync(async (req, res) => {
  const result = await VolunteerService.getAllvolunteersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'volunteer are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const VolunteerController = {
  getAllvolunteers,
};

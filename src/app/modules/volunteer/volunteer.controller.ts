import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { VolunteerService } from './volunteer.service';
import sendResponse from '../../utils/sendResponse';

const getAllVolunteers = catchAsync(async (req, res) => {
  const result = await VolunteerService.getAllvolunteersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'volunteer are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleVolunteer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VolunteerService.getSingleVolunteerFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Volunteer retrive successfully  ',
    data: result,
  });
});

const updatedVolunteer = catchAsync(async (req, res) => {
  const { email } = req.params;
  const { volunteer } = req.body;

  const result = await VolunteerService.updateVolunteerIntoDB(email, volunteer);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Volunteer is updated successfully',
    data: result,
  });
});

const deleteVolunteer = catchAsync(async (req, res) => {
  // paginationOptions
  const { email } = req.params;

  const result = await VolunteerService.deleteVolunteerFromDB(email);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Volunteer delete successfully  ',
    data: result,
  });
});

export const VolunteerController = {
  getAllVolunteers,
  getSingleVolunteer,
  updatedVolunteer,
  deleteVolunteer,
};

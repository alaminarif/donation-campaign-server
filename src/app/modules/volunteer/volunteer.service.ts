import QueryBuilder from '../../builder/QueryBuilder';
import { VolunteerSearchableFields } from './volunteer.constant';
import { Volunteer } from './volunteer.model';

const getAllvolunteersFromDB = async (query: Record<string, unknown>) => {
  const volunteerQuery = new QueryBuilder(Volunteer.find(), query)
    .search(VolunteerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await volunteerQuery.modelQuery;
  const meta = await volunteerQuery.countTotal();
  return {
    result,
    meta,
  };
};

export const VolunteerService = { getAllvolunteersFromDB };

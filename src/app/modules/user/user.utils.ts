import { User } from './user.model';

export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};

export const findLastManagerId = async () => {
  const lastManagerId = await User.findOne(
    {
      role: 'manager',
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastManagerId?.id ? lastManagerId.id.substring(2) : undefined;
};

export const generateManagerId = async () => {
  let currentId = (0).toString();
  const lastManagerId = await findLastManagerId();

  if (lastManagerId) {
    currentId = lastManagerId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `M-${incrementId}`;
  return incrementId;
};

export const findLastVolunteerId = async () => {
  const lastVolunteer = await User.findOne(
    {
      role: 'volunteer',
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastVolunteer?.id ? lastVolunteer.id.substring(2) : undefined;
};

export const generateVolunteerId = async () => {
  let currentId = (0).toString();
  const lastVolunteerId = await findLastVolunteerId();

  if (lastVolunteerId) {
    currentId = lastVolunteerId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `V-${incrementId}`;
  return incrementId;
};

export const findLastDonorId = async () => {
  const lastDonor = await User.findOne(
    {
      role: 'donor',
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastDonor?.id ? lastDonor.id.substring(2) : undefined;
};

export const generateDonorId = async () => {
  let currentId = (0).toString();
  const lastDonorId = await findLastDonorId();

  if (lastDonorId) {
    currentId = lastDonorId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `D-${incrementId}`;
  return incrementId;
};

export const findLastGuestId = async () => {
  const lastGuest = await User.findOne(
    {
      role: 'guest',
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastGuest?.id ? lastGuest.id.substring(2) : undefined;
};

export const generateGuestId = async () => {
  let currentId = (0).toString();
  const lastGuestId = await findLastGuestId();

  if (lastGuestId) {
    currentId = lastGuestId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `G-${incrementId}`;
  return incrementId;
};

const httpStatus = require('http-status');
const Patient = require('../../models/Patient/patient.model');
const ApiError = require('../../utils/ApiError');
const moment = require('moment');

const createPatient = async (patientBody) => {
  return Patient.create(patientBody);
};

const getAllPatients = async () => {
  return Patient.find().populate('medicalNotes userId doctor');
};

// const searchPatients = async (req) => {
//   const patiets = await Patient.search(
//     { query_string: { query: req.body.search } },
//     { hydrate: true, hydrateOptions: { select: 'name' } },
//     function (err, results) {
//       console.log(results);
//       return results;
//     }
//   );
//   return patiets;
// };

const getPatientById = async (id) => {
  return Patient.findById(id).populate('medicalNotes userId doctor');
};
const getPatientByName = async (name) => {
  const regex = new RegExp(name, 'i');
  return Patient.find({ name: { $regex: regex } }).populate('medicalNotes userId doctor');
};

const getPatientsByDoctor = async (doctorId) => {
  return Patient.find({ doctor: doctorId }).populate('medicalNotes userId doctor');
};
const getPatientByUserId = async (userId) => {
  return Patient.find({ userId: userId }).populate('userId, doctor');
};

const getPatientsByDate = (createdAt) => {
  return Patient.find({
    createdAt: {
      $gte: moment.utc(createdAt.from).toISOString(),
      $lte: moment.utc(createdAt.to).toISOString(),
    },
  });
};

const getTodayPatients = async () => {
  let t = moment(Date.now()).subtract(1, 'days');
  return Patient.find({
    createdAt: {
      $gte: moment.utc(t).toISOString(),
      $lte: moment.utc(Date.now()).toISOString(),
    },
  });
};

const updatePatientById = async (id, updateBody) => {
  const patient = await getPatientById(id);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  Object.assign(patient, updateBody);
  await patient.save();
  return patient;
};

const deletePatientById = async (id) => {
  const patient = await getPatientById(id);
  if (!patient) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  await patient.remove();
  return patient;
};

const getPatientAgeReport = async (req) => {
  let pipeline = [
    {
      $bucket: {
        groupBy: { $toInt: "$age" },                        // Field to group by
        boundaries: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, Infinity], // Boundaries for the buckets
        default: "Other",                             // Bucket id for documents which do not fall into a bucket
        output: {                                     // Output for each bucket
          "count": { $sum: 1 },
          "patientsMale": {
            $push: {
              $cond: [
                { $eq: ["$gender", "Male"] },
                {
                  "name": "$name",
                  "age": "$age",
                  "gender": "$gender"
                },
                "$$REMOVE"
              ]
            }
          },
          "patientsFemale": {
            $push: {
              $cond: [
                { $eq: ["$gender", "Female"] },
                {
                  "name": "$name",
                  "age": "$age",
                  "gender": "$gender"
                },
                "$$REMOVE"
              ]
            }
          }
        }
      }
    },
    {
      $project: {
        "range": {
          $concat: [
            { $toString: "$_id" },
            {
              $cond: [
                { $lt: ["$_id", 75] },
                {
                  $concat: [
                    "-", 
                    {
                      $toString: { $add: ["$_id", 4] }
                    }
                  ]
                },
                "+"
              ]
              
            }
          ]
        },
        "count": "$count",
        "patientsMale": "$patientsMale",
        "patientsFemale": "$patientsFemale"
      }
    }
  ];
  return Patient.aggregate(pipeline);
};

const getPatientHeightReport = async (req) => {
  let pipeline = [
    {
      $bucket: {
        groupBy: { $toInt: "$height" },                        // Field to group by
        boundaries: [0, 20, 40, 60, 80, Infinity], // Boundaries for the buckets
        default: "Other",                             // Bucket id for documents which do not fall into a bucket
        output: {                                     // Output for each bucket
          "count": { $sum: 1 },
          "patientsMale": {
            $push: {
              $cond: [
                { $eq: ["$gender", "Male"] },
                {
                  "name": "$name",
                  "height": "$height",
                  "gender": "$gender"
                },
                "$$REMOVE"
              ]
            }
          },
          "patientsFemale": {
            $push: {
              $cond: [
                { $eq: ["$gender", "Female"] },
                {
                  "name": "$name",
                  "height": "$height",
                  "gender": "$gender"
                },
                "$$REMOVE"
              ]
            }
          }
        }
      }
    },
    {
      $project: {
        "range": {
          $concat: [
            { $toString: "$_id" },
            {
              $cond: [
                { $lt: ["$_id", 75] },
                {
                  $concat: [
                    "-", 
                    {
                      $toString: { $add: ["$_id", 19] }
                    }
                  ]
                },
                "+"
              ]
              
            }
          ]
        },
        "count": "$count",
        "patientsMale": "$patientsMale",
        "patientsFemale": "$patientsFemale"
      }
    }
  ];
  return Patient.aggregate(pipeline);
};

const getPatientWeightReport = async (req) => {
  let pipeline = [
    {
      $bucket: {
        groupBy: { $toInt: "$weight" },                        // Field to group by
        boundaries: [0, 20, 40, 60, 80, Infinity], // Boundaries for the buckets
        default: "Other",                             // Bucket id for documents which do not fall into a bucket
        output: {                                     // Output for each bucket
          "count": { $sum: 1 },
          "patientsMale": {
            $push: {
              $cond: [
                { $eq: ["$gender", "Male"] },
                {
                  "name": "$name",
                  "weight": "$weight",
                  "gender": "$gender"
                },
                "$$REMOVE"
              ]
            }
          },
          "patientsFemale": {
            $push: {
              $cond: [
                { $eq: ["$gender", "Female"] },
                {
                  "name": "$name",
                  "weight": "$weight",
                  "gender": "$gender"
                },
                "$$REMOVE"
              ]
            }
          }
        }
      }
    },
    {
      $project: {
        "range": {
          $concat: [
            { $toString: "$_id" },
            {
              $cond: [
                { $lt: ["$_id", 75] },
                {
                  $concat: [
                    "-", 
                    {
                      $toString: { $add: ["$_id", 4] }
                    }
                  ]
                },
                "+"
              ]
              
            }
          ]
        },
        "count": "$count",
        "patientsMale": "$patientsMale",
        "patientsFemale": "$patientsFemale"
      }
    }
  ];
  return Patient.aggregate(pipeline);
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  getTodayPatients,
  getPatientByName,
  getPatientsByDoctor,
  getPatientByUserId,
  updatePatientById,
  getPatientsByDate,
  deletePatientById,
  getPatientAgeReport,
  getPatientHeightReport,
  getPatientWeightReport
};

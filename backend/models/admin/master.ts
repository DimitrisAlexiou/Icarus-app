import { Schema, model } from 'mongoose';

export interface masterProgramProps {
	title: string;
	startDate: Date;
	duration: number;
	ects: number;
}

const masterProgramSchema = new Schema<masterProgramProps>(
	{
		title: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		duration: {
			type: Number,
			required: true,
		},
		ects: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const MasterProgram = model<masterProgramProps>(
	'MasterProgram',
	masterProgramSchema
);

export const getMasterPrograms = () => MasterProgram.find();
export const getMasterProgramById = (id: string) => MasterProgram.findById(id);
export const getMasterProgramByTitle = (title: string) =>
	MasterProgram.findOne({ title });
export const createMasterProgram = (values: masterProgramProps) =>
	new MasterProgram(values)
		.save()
		.then((masterProgram) => masterProgram.toObject());
export const updateMasterProgramById = (
	id: string,
	masterProgram: masterProgramProps
) => MasterProgram.findByIdAndUpdate(id, masterProgram, { new: true });
export const deleteMasterProgramById = (id: string) =>
	MasterProgram.findByIdAndDelete(id);
export const deleteMasterPrograms = () => MasterProgram.deleteMany({});

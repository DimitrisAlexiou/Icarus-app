const Course = require('../models/course');

const connectDB = async () => {
	mongoose.Promise = global.Promise;
	mongoose
		.connect(process.env.MONGO_DB, {
			useNewUrlParser: true,
		})
		.then(
			() => {
				console.log(`✔️   Database sucessfully connected . . .`);
			},
			(error) => {
				console.log(`❌   Could not connect to database : ${error.message}`);
			},
		);
};

const seedCourses = [
	{
		cid: '321-3652',
		title: 'Object-oriented Programming II',
		type: 'undergraduate',
		description:
			'Introduction to OOP and UML. Java Language Fundamentals: Data types, Variable declarations, Operators and Assignment, Control structures, Strings, Arrays, Collections, Wrapper classes. Java as an OOP language: Classes, Constructors, Access modifiers, Packages, Interfaces, Garbage collection, Encapsulation, Cohesion, Coupling. Exception Handling: Basics, Exception Hierarchy, The Throwable class, Unchecked and checked exceptions, Exception and Inheritance, User defined Exceptions, Redirecting and Re-throwing Exceptions. Introduction to Concurrent programming and Multithreading: Introduction, Thread Creation, Thread Life cycle, priorities and scheduling, Synchronization, Communication of Threads. Files and I/O Streams: File Input stream and File output stream, Serialization. AWT: Basics, The Graphics class, Class hierarchy of AWT, Layout Managers, Java 2D API. Swings: Introduction, Swing packages, Hierarchy of swing classes, Advanced layout Managers. Introduction to networking with Java: Introduction, Stream Socket Connections.',
		semester: 'winter',
		year: '2',
		isActive: true,
		hasLab: true,
		isObligatory: true,
		cycle: 'software engineering',
		ects: 5,
	},
	// {
	// 	cid: '321-3004',
	// 	title: 'Data Structures',
	// 	description:
	// 		'Introduction - Basic concepts of algorithms and data structures, Abstract Data Types (ADT), Performance Algorithm, Analysis of algorithms, Asymptotic notations, Arrays (multidimensional, special forms, sparse), Lists (simply connected, circular, doubly linked), Stacks (with implementation table with a list implementation, applications), tails (realization with a round table with a list implementation, applications), Trees (quantitative data, representation of arrays and pointers, cross), priority Queue, heap Structure, Search (linear, binary, with interpolation), Sort (with option to import, bubble, quicksort, heap with merger), binary search trees, weighted search tree, red-black trees, B-trees, hash (dictionary function and hash table, collisions, fragmentation chains, linear and double fragmentation), Graphs (a reconstruction table / list of neighborhood, breadth-first search, depth-first search). The design or selection of appropriate data structures for specific programming problems. The implementation and evaluation of different structures. Basic algorithmic techniques.',
	// },
	// {
	// 	cid: '321-3354',
	// 	title: 'Computer Architecture',
	// 	description:
	// 		'Historical data on the evolution of computers. Architecture Von Neumann. Main memory. Auxiliary memory. Cache (Cache memory). Virtual Memory (Virtual Memory). I / O modules. Evaluation of Computer. Forms of representation of numerical data (both fixed and floating point). Structure and characteristics of the instruction set that supports the CPU. Machine language commands. Types of machine language commands. Types and data size. Simple computers (RISC) and complex instruction set (CISC). Support high-level programming languages. Organization and operation of the Central Processing Unit (CPU). Parallel processing. Multi-processor systems (MIMD, SIMD). Implementation of arithmetic. Channels. Technologies and methodologies for design of computer memory. Behavior management and multi-level memory hierarchy. Virtual Memory. Addressing modes for data management and from memory. Ways of addressing memory. Memory technology. Semiconductor memories. Static direct access memories, dynamic random access memory directly. Semiconductor memories accessible by content (Content Addressable Memories, CAM). Magnetic Memories. Memories of magnetic disks. Memories of magnetic tape. Optical Memories.',
	// },
	// {
	// 	cid: '321-5502',
	// 	title: 'Signals and Systems',
	// 	description:
	// 		'Basic definitions of signals and systems, periodic signals, unit step, impulse function. Systems’ categories, static and dynamic systems, causal and non-causal systems, linear and non-linear systems, time invariant and variant systems. Impulse response of linear systems. Convolution properties. Systems’ stability. Fourier Transform (FT) and inverse FT. Convergence and properties of FT. Application of FT to the study of linear systems, system’s frequency response, description of Linear Time Invariant (LTI) systems with differential equations and the FT, ideal lowpass filter. Fourier series, Fourier series of periodic functions, Fourier series for even or odd symmetry, Parseval’s theorem. Laplace transform, properties and theorems. Inverse Laplace transform. Relation of the Laplace and Fourier transforms. Bilateral Laplace transform. Use of the Laplace transform in the solution of linear differential equations. Use of the Laplace transform in the analysis of linear systems and the study of their stability. State space, state, observability, controllability. Signal and systems of discrete time. Z transform and its properties, inverse Z transform. FT of discrete time. Unilateral Z transform. Sampling – Nyquist’s theorem. Discrete Fourier Transform (DFT).',
	// },
];

Course.insertMany(seedCourses)
	.then((res) => {
		console.log(res);
	})
	.catch((e) => {
		console.log(e);
	});

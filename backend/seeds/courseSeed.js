const Course = require('../models/course');

const connectDB = async () => {
	mongoose.Promise = global.Promise;
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
		})
		.then(
			() => {
				console.log(`✔️   Database sucessfully connected . . .`.cyan.underline);
			},
			(error) => {
				console.log(
					`❌   Could not connect to database : ${error.message}`.red.underline
						.bold,
				);
			},
		);
};

const seedCourses = [
	{
		cid: '321/3652',
		title: 'Object-oriented Programming II',
		type: 'undergraduate',
		description:
			'Introduction to OOP and UML. Java Language Fundamentals: Data types, Variable declarations, Operators and Assignment, Control structures, Strings, Arrays, Collections, Wrapper classes. Java as an OOP language: Classes, Constructors, Access modifiers, Packages, Interfaces, Garbage collection, Encapsulation, Cohesion, Coupling. Exception Handling: Basics, Exception Hierarchy, The Throwable class, Unchecked and checked exceptions, Exception and Inheritance, User defined Exceptions, Redirecting and Re-throwing Exceptions. Introduction to Concurrent programming and Multithreading: Introduction, Thread Creation, Thread Life cycle, priorities and scheduling, Synchronization, Communication of Threads. Files and I/O Streams: File Input stream and File output stream, Serialization. AWT: Basics, The Graphics class, Class hierarchy of AWT, Layout Managers, Java 2D API. Swings: Introduction, Swing packages, Hierarchy of swing classes, Advanced layout Managers. Introduction to networking with Java: Introduction, Stream Socket Connections.',
		semester: 'winter',
		year: '2',
		isActive: false,
		hasLab: true,
		isObligatory: true,
		cycle: none,
		ects: 5,
	},
	{
		cid: '321/1204',
		title: 'Structured Programming',
		type: 'undergraduate',
		description:
			'Introduction to programming, programming languages, The C programming language,Variables and constants, Declarations, Operators, Expressions, Data input and output, conditional expressions, functions, Matrices, Pointers, Formatted input and output, Complicated structures, File manipulation.',
		semester: 'winter',
		year: '1',
		isActive: false,
		hasLab: true,
		isObligatory: true,
		cycle: none,
		ects: 5,
	},
	{
		cid: '321/1407',
		title: 'Introduction to Computer Science and Communications',
		type: 'undergraduate',
		description:
			'Introduction to Information Systems, conceptual framework. Categories of Information Systems and areas of application. Fundamental skills of Information & Communication Systems Engineers. Introduction to circuits. MOS transistors and logic gates. Introduction to Computer Architecture. Introduction to Computer Networks. Introduction to Internet and Web Technologies. Social and legal aspects of information and communication technologies. Current trends and challenges.',
		semester: 'winter',
		year: '1',
		isActive: false,
		hasLab: true,
		isObligatory: true,
		cycle: none,
		ects: 5,
	},
	{
		cid: '321/2003',
		title: 'Logic Design',
		type: 'undergraduate',
		description:
			"Introduction: Analog and Digital Signals, Usefulness of Digital Signal Processing and Digital Circuits, Evolution of Digital Circuits. Digital Systems and Binary Numbers: Digital Systems, Binary Numbers, Number-Base Conversions, Octal and Hexadecimal Numbers, Complements, Signed Binary Numbers, Binary Codes, Binary Storage and Registers, Binary Logic. Boolean Algebra and Logic Gates: Basic Definitions, Axiomatic Definition of Boolean Algebra, Basic Theorems and Properties of Boolean Algebra, Boolean Functions, Canonical and Standard Forms of Boolean Functions, Other Logic Operations, Digital Logic Gates. Gate-Level Minimization: The Map Method, Three, Four and Five-Variable Maps, Product-of-Sums Simplification, Don't-Care Conditions, NAND and NOR Implementations, XOR Function. Combinational Logic: Combinational Circuits, Analysis Procedure, Design Procedure, Binary Adder-Subtractor, Binary Multiplier, Magnitude Comparator, Decoders, Encoders, Multiplexers, Tri-State Gates. Synchronous Sequential Logic: Sequential Circuits, Latches, Flip-Flops, Analysis of Clocked Sequential Circuits, State Reduction and Assignment, Design Procedure. Registers and Counters: Registers, Shift Registers, Ripple Counters, Synchronous Counters, Other Counters.",
		semester: 'winter',
		year: '1',
		isActive: false,
		hasLab: true,
		isObligatory: true,
		cycle: none,
		ects: 5,
	},
	{
		cid: '321/2052',
		title: 'Physics',
		type: 'undergraduate',
		description:
			'Scalar, vector quantities. Kinematics. Relative motion, rotation of the earth. Forces, torques, centre mass, equilibrium of rigid body. Dynamics, friction in a liquid, bodies with changing mass, angular momentum. Work, energy, potential, conservative forces, central forces. Dynamics of a system of particles, two body problem, collisions. Gravity, motion in the gravitational field. Electrostatics: Coulomb’s law, electric field, potential, flux, Gauss’s law, Poisson equation, potential energy, boundary conditions, method of images, electric dipole, multipole expansion, conductors, capacity, dielectrics, polarization, electrical displacement. Electric current, continuity equation, steady current, Ohm’s law. Magnetostatics: Laplace’s force, Lorentz, force on a current-carrying wire, magnetic dipole, Biot-Savart’s law, Ampere’s law, vector potential, field of a magnetic dipole, magnetic materials, magnetization. Ampere-Maxwell’s equation, Faraday’s equation, scalar potential of EM field, mutual inductance, self inductance, RL, RC, RLC circuits, Maxwell’s equations, energy/momentum conservation theorems, equations of potentials in Coulonb, Lorentz gauges, elements of electromagnetic waves.',
		semester: 'winter',
		year: '1',
		isActive: false,
		hasLab: true,
		isObligatory: true,
		cycle: none,
		ects: 5,
	},
	{
		cid: '321/1501',
		title: 'Discrete Mathematics I',
		type: 'undergraduate',
		description:
			'Logic: compound statements, conditional statements, predicates, quantifiers, methods of proof. Elementary number theory: divisibility, prime numbers, parity. Elementary set theory: operations, identities, cardinality, inclusion-exclusion principle. Mathematical induction. Combinatorial analysis: multiplication rule, permutations, orderings, combinations, the pidgeonhole principle, binomial coefficients. Binary relations, functions, equivalence relations, partial ordering relations.',
		semester: 'winter',
		year: '1',
		isActive: false,
		hasLab: true,
		isObligatory: true,
		cycle: none,
		ects: 5,
	},
	{
		cid: '321/1107',
		title: 'Mathematics for Engineers I',
		type: 'undergraduate',
		description:
			'Mathematical induction. Completeness of the real numbers. Functions. Limits. Continuity, theorems of continuous functions. Uniform continuity. Differentiation, derivative of inverse functions, derivatives of trigonometric functions, differential. Applications of derivatives, extreme values of functions, concavity, curve sketching, Cauchy mean value theorem, L’ Hopital rule, graphical method of solving autonomous differential equations, Newton’s approximation method. Integral, indefinite, definite, techniques of integration. Volume of solids of revolution. Improper integrals. Transcendental functions. Taylor’s formula. Differential equations of first order (separable, homogeneous, linear, Bernoulli, Ricatti, exact, Euler integrating factor, equations of special form, orthogonal trajectories).',
		semester: 'winter',
		year: '1',
		isActive: false,
		hasLab: true,
		isObligatory: true,
		cycle: none,
		ects: 5,
	},
];

Course.insertMany(seedCourses)
	.then((res) => {
		console.log(res);
	})
	.catch((e) => {
		console.log(e);
	});

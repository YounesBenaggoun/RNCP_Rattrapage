import Pool from "../../3_InfraStructure/database/database.js";

// import Config from "../../config.env.js";

// import AllUser from "../../2_Application/usecases/user/User.getAll.usecase.js";
// import RegisterUser from "../../2_Application/usecases/user/User.register.usecase.js";
// import LoginUser from "../../2_Application/usecases/user/User.login.usecase.js";


// import UserRepository from "../../3_InfraStructure/Repositories/User.Repository.js";

// import PasswordHasher from "../../3_InfraStructure/security/bcrypt.js";
// import JwtService from "../../3_InfraStructure/security/jwtService.js";



// const repository = new UserRepository();
// const passwordHasher = new PasswordHasher(Config.SALT_ROUNDS);
// const tokenService = new JwtService(Config.JWT_SECRET);





// const allUser = new AllUser(repository);
// const registerUser = new RegisterUser(repository, passwordHasher, tokenService);
// const loginUser = new LoginUser(repository, passwordHasher, tokenService);

import PostgresOniRepository from "../../3_InfraStructure/repositories/Postgress.Oni.repository.js";

const repository = new PostgresOniRepository({ pool: Pool });



const OniController = {};


OniController.getAll = async (req, res) => {
    try {
        const result = await repository.getAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode ?? 500).json({ message: error.message });
    }
};
OniController.findDuplicatedData = async (req, res) => {
    try {
        const result = await repository.findDuplicatedData();
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode ?? 500).json({ message: error.message });
    }
};


OniController.getByRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const result = await repository.getByRange(startDate, endDate);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode ?? 500).json({ message: error.message });
    }
};



OniController.latest = async (req, res) => {
    try {
        const result = await repository.findLatest();
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode ?? 500).json({ message: error.message });
    }
};


export default OniController;
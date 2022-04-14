const WaitingRoom = require('../../models/waiting_room');

class WaitingRoomController {
  async create(req, res, next) {
    const {
      user,
      receptionist,
      manager,
      admittedToHospital,
      medicalFalculty
    } = req.body;

    try {
      let waitingItem = new WaitingRoom({
         user: user,
         receptionist: receptionist,
         manager: manager,
         medicalFalculty: medicalFalculty
      })

      const data = await waitingItem.save();
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).send("Create failed");
    }

    next();
  }

  async index(req, res, next) {
    if (!req.query.receptionist) {
      delete req.query.receptionist;
    }
    if (!req.query.manager) {
      delete req.query.manager;
    }

    let waitingList = await WaitingRoom.find(req.query)
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: {name: 1, publicAddress: 1, email: 1, phone: 1}
      })
      .populate({
        path: "manager",
        select: {name: 1, publicAddress: 1, email: 1, phone: 1}
      })

    res.status(200).json(waitingList);

    next();
  }

  async destroy(req, res, next) {
    res.send("Destroy");
  }
}

module.exports = new WaitingRoomController();

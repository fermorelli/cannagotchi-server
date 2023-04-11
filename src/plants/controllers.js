import Plants from './plants.js';

const getAllPlants = async (req, res)=>{
    try {
        const plants = await Plants.find({});
        if(!plants){
            return res.status(404).json({
                message: 'Plants not found',
                data: {},
                error: true,
            });
        }
        return res.status(202).json({
            message: 'Plants:',
            data: plants,
            error: false,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            data: {},
            error: true,
        });
    }
};


const getPlantById  = async (req, res) => {
    try {
        const plant = await Plants.findById(req.params.id);
        if(!plant) {
            return res.status(404).json({
                message: 'Plant not found',
                data: {},
                error: true,
            });
        }
        return res.status(200).json({
            message: `Plant with ID:${req.params.id} found`,
            data: plant,
            error: false,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            data: {},
            error: true,
        })
    }
}

const createPlant = async (req, res) => {
  try {
      const plant = new Plants({
          user_id: req.body.user_id,
          plant_name: req.body.plant_name,
          genetic: req.body.genetic,
          grow_mode: req.body.grow_mode,
          auto: req.body.auto,
          germination_date: req.body.germination_date
      });

      const result = await plant.save();
      return res.status(201).json({
          message: 'Plant successfully added',
          data: result,
          error: false,
      });
  } catch (error) {
      return res.status(400).json({
          message: 'Error when adding new plant',
          data: {},
          error: true,
      })
  }
}

const deletePlant = async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          message: 'Missing Id parameter',
          data: undefined,
          error: true,
        });
      }
      const result = await Plants.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({
          message: `Plant with ID ${req.params.id} has not been found`,
          data: undefined,
          error: true,
        });
      } return res.status(200).json({
        message: 'Plant has been successfully deleted',
        data: result,
        error: false,
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
        data: undefined,
        error: true,
      });
    }
  };

  const updatePlant = async (req, res) => {
    try {
      if (!req.params) {
        return res.status(404).json({
          message: 'Missing id parameter',
          data: undefined,
          error: true,
        });
      }
      const result = await Plants.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!result) {
        return res.status(404).json({
          message: 'Plant has not been found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Plant successfully updated',
        data: result,
        error: false,
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
        data: undefined,
        error: true,
      });
    }
  };

  export default {
    createPlant,
    getAllPlants,
    getPlantById,
    updatePlant,
    deletePlant,
  }
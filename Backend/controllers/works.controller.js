const db = require('./../models');
const Works = db.works

exports.findAll = async (req, res) =>  {
	const works = await Works.findAll({include: 'category'});
	
	// Corriger les URLs des images pour utiliser le bon port/host
	const correctedWorks = works.map(work => {
		if (work.imageUrl && work.imageUrl.includes('localhost:5678')) {
			work.imageUrl = work.imageUrl.replace('localhost:5678', `${req.get('host')}`);
		}
		return work;
	});
	
	return res.status(200).json(correctedWorks);
}

exports.create = async (req, res) => {
	const host = req.get('host');
	const title = req.body.title;
	const categoryId = req.body.category;
	const userId = req.auth.userId;
	const imageUrl = `${req.protocol}://${host}/images/${req.file.filename}`;
	try{
		const work = await Works.create({
			title,
			imageUrl,
			categoryId,
			userId
		})
		return res.status(201).json(work)
	}catch (err) {
		return res.status(500).json({ error: new Error('Something went wrong') })
	}
}

exports.delete = async (req, res) => {
	try{
		await Works.destroy({where:{id: req.params.id}})
		return res.status(204).json({message: 'Work Deleted Successfully'})
	}catch(e){
		return res.status(500).json({error: new Error('Something went wrong')})
	}

}

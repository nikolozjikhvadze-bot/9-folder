import { MongoClient } from 'mongodb'

async function handler (req, res) {
    if(req.method === 'POST') {
        const userEmail = req.body.email
    

        if(!userEmail || !userEmail.includes('@')) {
            res.status(422).json({message: 'Invalid Email Address.'});
            return;
        }

        const client = await MongoClient.connect('mongodb://nikolozjikhvadze_db_user:nikolozi1.0.1@ac-gzxyozi-shard-00-00.8euf9cj.mongodb.net:27017,ac-gzxyozi-shard-00-01.8euf9cj.mongodb.net:27017,ac-gzxyozi-shard-00-02.8euf9cj.mongodb.net:27017/?ssl=true&replicaSet=atlas-115k98-shard-0&authSource=admin&appName=Cluster0')
        
            const db = client.db()

            await db.collection('emails').insertOne({email: userEmail});

            client.close();
        
            res.status(201).json({message: 'Signed Up!'}); 
    }
}

export default handler;
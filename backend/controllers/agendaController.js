const AgendaItem = require('../models/AgendaItem');
const xlsx = require('xlsx');
const fs = require('fs');

exports.getAgenda = async (req, res) => {
    try {
        const items = await AgendaItem.find().sort({ date: 1, startTime: 1 }) || [];
        res.status(200).json({ success: true, items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createAgendaItem = async (req, res) => {
    try {
        const item = new AgendaItem(req.body);
        await item.save();
        res.status(201).json({ success: true, item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.importAgenda = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        let createdCount = 0;
        for (const row of rows) {
            // Expected columns: Date, Début, Fin, Titre, Section, Speaker, Rôle, Tags
            const item = new AgendaItem({
                date: row['Date'] || '2026-04-22',
                startTime: row['Début'] || row['Start Time'] || '09:00',
                endTime: row['Fin'] || row['End Time'] || '10:00',
                title: row['Titre'] || row['Title'],
                section: row['Section'] || 'Main Stage',
                speakerName: row['Speaker'] || '',
                speakerRole: row['Rôle'] || row['Role'] || '',
                tags: row['Tags'] ? row['Tags'].split(',').map(s => s.trim()) : [],
                description: row['Description'] || ''
            });

            if (item.title && item.startTime) {
                await item.save();
                createdCount++;
            }
        }

        fs.unlinkSync(filePath);
        res.status(200).json({ success: true, message: `${createdCount} items imported` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteAgendaItem = async (req, res) => {
    try {
        await AgendaItem.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

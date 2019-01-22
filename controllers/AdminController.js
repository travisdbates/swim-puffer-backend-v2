module.exports = {
  adminGetAll: (req, res, next) => {
    const db = req.app.get('db');

    db
      .admin_get_all()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  adminGetTimes: (req, res, next) => {
    const db = req.app.get('db');

    db
      .admin_get_times()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  adminAssignTime: (req, res, next) => {
    const db = req.app.get('db');

    const { session_id, time_id } = req.params;
    // console.log(session_id);
    // console.log(time_id);
    db
      .admin_assign_time([session_id, time_id])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  timeSlot: (req, res, next) => {
    const db = req.app.get('db');

    const { session_id, age } = req.params;
    // console.log('DECTIME: ', session_id);
    // console.log('DECTIME AGE: ', age);
    db
      .admin_dectime_addage([session_id, age])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  emailSent: (req, res, next) => {
    const db = req.app.get('db');

    const {sessionassignmentid, assigntime} = req.body;
    console.log('update controller req.body', sessionassignmentid, assigntime)
    db
      .admin_update_email([sessionassignmentid, assigntime])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  adminSwimTeamTimes: (req, res, next) => {
    const db = req.app.get('db')

    db.admin_swim_team_times().then(response => {
      res.status(200).send(response)
    })
  }
};

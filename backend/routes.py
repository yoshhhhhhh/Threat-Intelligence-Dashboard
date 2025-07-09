from flask import Blueprint, request, jsonify
from models import Threat, db
from sqlalchemy import func

routes = Blueprint('routes', __name__)

@routes.route('/api/threats', methods=['GET'])
def get_threats():
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=10, type=int)
    category = request.args.get('category')
    search = request.args.get('search')

    query = Threat.query

    if category:
        query = query.filter(Threat.threat_category.ilike(f"%{category}%"))
    if search:
        query = query.filter(Threat.cleaned_description.ilike(f"%{search}%"))

    paginated = query.paginate(page=page, per_page=limit, error_out=False)

    return jsonify({
        "page": page,
        "total": paginated.total,
        "pages": paginated.pages,
        "data": [threat.to_dict() for threat in paginated.items]
    })


@routes.route('/api/threats/<int:threat_id>', methods=['GET'])
def get_threat_by_id(threat_id):
    threat = Threat.query.get(threat_id)
    if not threat:
        return jsonify({"error": "Threat not found"}), 404
    return jsonify(threat.to_dict())



@routes.route('/api/threats/stats', methods=['GET'])
def threat_stats():
    total_threats = Threat.query.count()

    # Group by threat_category
    category_counts = (
        db.session.query(Threat.threat_category, func.count())
        .group_by(Threat.threat_category)
        .all()
    )

    # Group by severity_score
    severity_counts = (
        db.session.query(Threat.severity_score, func.count())
        .group_by(Threat.severity_score)
        .all()
    )

    return jsonify({
        "total_threats": total_threats,
        "threats_by_category": {cat: count for cat, count in category_counts},
        "threats_by_severity": {str(score): count for score, count in severity_counts}
    })
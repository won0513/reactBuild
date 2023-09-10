from flask import Flask

#def create_app():
app = Flask(__name__)

# session storage 사용하기 위한 키
MYSECRET = 'this is my key'
app.secret_key = MYSECRET
# 블루프린트
from .views import main_views
app.register_blueprint(main_views.bp)


#    return app
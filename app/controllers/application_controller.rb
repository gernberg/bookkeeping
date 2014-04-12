class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception



  after_action  :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  ##
  # Helper renderer that fixes JSONP / JSON vulnerabilites
  # Read more: technpol.wordpress.com/2013/09/28/json-jsonp-xss-vulnerability-with-angularjs-and-rails/
  # AngularJS: http://docs.angularjs.org/api/ng/service/$http
  def render_with_protection(object, parameters = {})
    render parameters.merge(content_type: 'application/json', text: ")]}',\n" + object.to_json)
  end

  protected

  def verified_request?
    super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
  end   


end

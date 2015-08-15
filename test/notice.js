/* global process */
/* global it */
/* global describe */
var should = require("should");
var Notice = require('../index');

var notice = new Notice();

describe('Notice Api test', function () {

	it('get', function (done) {
		this.timeout(15000);
		notice.get(6, function (err, articles) {
			should.not.exist(err);
			articles.length.should.eql(6);
			articles.forEach(function (article) {
				should.ok(article.url);
				should.ok(article.title);
				console.log(article.url);
			});
			done();
		});
	});
});
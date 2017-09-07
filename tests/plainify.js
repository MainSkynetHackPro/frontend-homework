'use strict';

QUnit.module('Тестируем функцию plainify', function () {
    QUnit.test('plainify принимает пустой объект', function (assert) {
        assert.deepEqual(plainify({}), {});

        assert.deepEqual(plainify({1: null}), {})
    });

	QUnit.test('plainify работает правильно', function (assert) {
		assert.deepEqual(plainify({foo: 'bar', baz: 42}), {'foo': 'bar', 'baz': 42});

		const nested1 = {
			deep: {
				foo: 'bar',
				baz: 42
			}
		};

		const plain1 = {
			'deep.foo': 'bar',
			'deep.baz': 42
		};

		assert.deepEqual(plainify(nested1), plain1);

		const nested2 = {
			deep: {
				foobar: 0,
				nested: {
					object: {
						fields: {
							foo: 42,
							bar: 42,
							baz: 42,
						}
					}
				}
			}
		};

		const plain2 = {
			'deep.foobar': 0,
			'deep.nested.object.fields.foo': 42,
			'deep.nested.object.fields.bar': 42,
			'deep.nested.object.fields.baz': 42
		};

		assert.deepEqual(plainify(nested2), plain2);
	});

    QUnit.test('plainify обрабатывает сложный объект', function (assert) {
        const nested3 = {
            deep: {
                var1: {
                    s: 1,
                    k: {
                        a: {
                            g: 2
                        },
                        b: 1
                    }
                },
                var2: {
                    var1: "var1",
                    var2: {
                        var1: "1"
                    }
                }
            }
        };

        const plain3 = {
            "deep.var1.s": 1,
            "deep.var1.k.a.g": 2,
            "deep.var1.k.b": 1,
            "deep.var2.var1": "var1",
            "deep.var2.var2.var1": "1"
        };

        assert.deepEqual(plainify(nested3), plain3);
    });

});

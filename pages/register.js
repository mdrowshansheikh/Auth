import Head from 'next/head';
import Layout from '../layout/layout';
import Link from 'next/link';
import styles from '../styles/Form.module.css';
import Image from 'next/image';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi';
import { useState } from 'react';
import { useFormik } from 'formik';
import { register_validation } from '../lib/validate';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();

  const [show, setShow] = useState({ password: false, cpassword: false });

  const formik = useFormik({
    initialValues: {
      Username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: register_validation,
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    await fetch('http://localhost:3000/api/auth/signup', options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.push('http://localhost:3000');
        }
      });
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            officia?
          </p>
        </div>

        {/* form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <div
            className={`${styles.input_group} ${
              formik.errors.Username && formik.touched.Username
                ? 'border border-rose-500'
                : ''
            }`}
          >
            <input
              type="text"
              name="Username"
              placeholder="Username"
              className={styles.input_text}
              {...formik.getFieldProps('Username')}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={25} />
            </span>
          </div>
          {formik.errors.Username && formik.touched.Username ? (
            <span className="text-rose-500">{formik.errors.Username}</span>
          ) : (
            ''
          )}
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? 'border border-rose-500'
                : ''
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps('email')}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <span className="text-rose-500">{formik.errors.email}</span>
          ) : (
            ''
          )}
          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? 'border border-rose-500'
                : ''
            }`}
          >
            <input
              type={`${show.password ? 'text' : 'password'}`}
              name="password"
              placeholder="password"
              className={styles.input_text}
              {...formik.getFieldProps('password')}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <span className="text-rose-500">{formik.errors.password}</span>
          ) : (
            ''
          )}

          <div
            className={`${styles.input_group} ${
              formik.errors.cpassword && formik.touched.cpassword
                ? 'border border-rose-500'
                : ''
            }`}
          >
            <input
              type={`${show.cpassword ? 'text' : 'password'}`}
              name="cpassword"
              placeholder="Confirm Password"
              className={styles.input_text}
              {...formik.getFieldProps('cpassword')}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.cpassword && formik.touched.cpassword ? (
            <span className="text-rose-500">{formik.errors.cpassword}</span>
          ) : (
            ''
          )}

          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400 ">
          Have an account?{' '}
          <Link href={'/login'}>
            <a className="text-blue-700">Sign In</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
}

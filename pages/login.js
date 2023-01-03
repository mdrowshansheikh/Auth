import Head from 'next/head';
import Layout from '../layout/layout';
import Link from 'next/link';
import styles from '../styles/Form.module.css';
import Image from 'next/image';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import login_Validate from '../lib/validate';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const [show, setShow] = useState(false);
  //  Google
  async function handleGoogleSignin() {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  }
  // facebook
  async function handleGithubSignin() {
    signIn('facebook', { callbackUrl: 'http://localhost:3000' });
  }

  // Form handeling =========================>
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: login_Validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    });
    if (status.ok) {
      router.push(status.url);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
        </div>

        {/* form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
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
            <></>
          )}
          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? 'border border-rose-500'
                : ''
            }`}
          >
            <input
              type={`${show ? 'text' : 'password'}`}
              name="password"
              placeholder="password"
              className={styles.input_text}
              {...formik.getFieldProps('password')}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <span className="text-rose-500">{formik.errors.password}</span>
          ) : (
            <></>
          )}

          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              onClick={handleGoogleSignin}
              type="button"
              className={styles.button_custom}
            >
              Sign In with Google{' '}
              <Image src={'/assets/google.svg'} width="20" height={20}></Image>
            </button>
          </div>
          <div className="input-button">
            <button
              onClick={handleGithubSignin}
              type="button"
              className={styles.button_custom}
            >
              Sign In with Github{' '}
              <Image src={'/assets/github.svg'} width={25} height={25}></Image>
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400 ">
          don&apos;t have an account yet?{' '}
          <Link href={'/register'}>
            <a className="text-blue-700">Sign Up</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
}

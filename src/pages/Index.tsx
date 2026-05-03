import { useState } from "react";
import Icon from "@/components/ui/icon";

const PRODUCTS = [
  {
    id: 1,
    name: "CARGO-01",
    subtitle: "Тактическая сумка",
    price: 18900,
    image: "https://cdn.poehali.dev/projects/247b83a8-9273-4551-9e66-5ea22b35b356/files/a367f9ef-deaa-4fd3-95aa-6bb2dc349d35.jpg",
    material: "Баллистический нейлон · Сталь 304",
    tag: "BESTSELLER",
  },
  {
    id: 2,
    name: "FRAME-02",
    subtitle: "Кросс-боди",
    price: 14500,
    image: "https://cdn.poehali.dev/projects/247b83a8-9273-4551-9e66-5ea22b35b356/files/1b189f3d-31c8-4d18-82e1-1f65bf3148b1.jpg",
    material: "Кордура 1000D · Алюминий",
    tag: "NEW",
  },
  {
    id: 3,
    name: "SLAB-03",
    subtitle: "Шоппер",
    price: 22400,
    image: "https://cdn.poehali.dev/projects/247b83a8-9273-4551-9e66-5ea22b35b356/files/8ea194ea-7810-4e66-ba7b-d232da291171.jpg",
    material: "Технический брезент · Латунь",
    tag: null,
  },
];

type CartItem = { id: number; name: string; price: number; qty: number };
type Step = "catalog" | "cart" | "checkout" | "success";

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState<Step>("catalog");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", comment: "" });

  const addToCart = (product: (typeof PRODUCTS)[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    setCart([]);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--nc-bg)", color: "var(--nc-body)", fontFamily: "IBM Plex Sans, sans-serif" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-6"
        style={{ background: "rgba(247,244,240,0.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--nc-line)" }}
      >
        <button
          onClick={() => { setStep("catalog"); setMenuOpen(false); }}
          style={{ fontFamily: "Cormorant, serif", fontSize: "1.15rem", fontWeight: 400, letterSpacing: "0.25em", color: "var(--nc-heading)" }}
        >
          NOVACLOU
        </button>

        <div className="hidden md:flex items-center gap-12">
          {["Коллекция", "О бренде", "Контакты"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[11px] tracking-widest uppercase transition-colors duration-300"
              style={{ color: "var(--nc-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nc-heading)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nc-muted)")}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setStep(step === "cart" ? "catalog" : "cart")}
            className="relative flex items-center gap-2 transition-colors duration-300"
            style={{ color: "var(--nc-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nc-heading)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nc-muted)")}
          >
            <Icon name="ShoppingBag" size={18} />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center text-[10px] font-medium"
                style={{ background: "var(--nc-accent)", color: "#fff", borderRadius: "50%" }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--nc-muted)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10" style={{ background: "var(--nc-bg)" }}>
          {["Коллекция", "О бренде", "Контакты"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-4xl font-light tracking-widest"
              style={{ fontFamily: "Cormorant, serif", color: "var(--nc-heading)" }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* ===================== CATALOG ===================== */}
      {step === "catalog" && (
        <>
          {/* HERO */}
          <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-28">
            {/* accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(to right, var(--nc-accent), var(--nc-accent2), var(--nc-copper))" }} />
            <div className="max-w-5xl">
              <p
                className="text-[11px] tracking-[0.5em] uppercase mb-10 animate-fade-in"
                style={{ color: "var(--nc-muted)", animationDelay: "0.1s", opacity: 0 }}
              >
                Промышленные материалы · Честная конструкция
              </p>
              <h1
                className="font-light leading-[0.9] mb-10 animate-fade-up"
                style={{
                  fontFamily: "Cormorant, serif",
                  fontSize: "clamp(5rem, 13vw, 11rem)",
                  color: "var(--nc-heading)",
                  animationDelay: "0.25s",
                  opacity: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                Nova
                <br />
                <span style={{ color: "var(--nc-accent)", WebkitTextStroke: "0px" }}>clou.</span>
              </h1>
              <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-20">
                <p
                  className="max-w-xs text-sm leading-relaxed animate-fade-up"
                  style={{ color: "var(--nc-muted)", animationDelay: "0.45s", opacity: 0 }}
                >
                  Каждая вещь — это функция в форме. Баллистический нейлон, кованая сталь, латунь. Без лишнего.
                </p>
                <button
                  onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase pb-2 transition-all duration-300 animate-fade-up"
                  style={{ color: "var(--nc-accent)", borderBottom: "1px solid var(--nc-accent)", animationDelay: "0.6s", opacity: 0, width: "fit-content" }}
                >
                  Смотреть коллекцию
                  <Icon name="ArrowRight" size={13} />
                </button>
              </div>
            </div>

            <div
              className="absolute right-0 top-0 bottom-0 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom, transparent, var(--nc-line) 30%, var(--nc-line) 70%, transparent)" }}
            />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3">
              <span className="text-[9px] tracking-[0.4em] uppercase" style={{ writingMode: "vertical-rl", color: "var(--nc-line)" }}>
                SS 2026
              </span>
            </div>
          </section>

          <div style={{ height: "1px", background: "var(--nc-line)", margin: "0 1.5rem" }} />

          {/* COLLECTION */}
          <section id="collection" className="px-6 md:px-16 py-24 md:py-32">
            <div className="flex items-baseline justify-between mb-20">
              <h2
                className="font-light"
                style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--nc-heading)", letterSpacing: "-0.01em" }}
              >
                Коллекция
              </h2>
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--nc-muted)" }}>3 изделия</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {PRODUCTS.map((product, idx) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} idx={idx} />
              ))}
            </div>
          </section>

          {/* MANIFESTO */}
          <section className="px-6 md:px-16 py-24 md:py-32" style={{ background: "var(--nc-accent-light)", borderTop: "3px solid var(--nc-accent)" }}>
            <div className="max-w-2xl">
              <p
                className="font-light leading-tight"
                style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--nc-heading)" }}
              >
                Мы не украшаем.
                <br />
                <em style={{ color: "var(--nc-accent)" }}>Мы строим.</em>
              </p>
              <p className="mt-8 text-sm leading-relaxed max-w-sm" style={{ color: "var(--nc-muted)" }}>
                Каждое соединение, каждый шов, каждая фурнитура существуют по причине — не ради красоты, а ради надёжности.
              </p>
            </div>
          </section>

          {/* FOOTER */}
          <footer
            className="px-6 md:px-16 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ borderTop: "1px solid var(--nc-line)" }}
          >
            <span style={{ fontFamily: "Cormorant, serif", letterSpacing: "0.2em", color: "var(--nc-muted)", fontSize: "0.95rem" }}>NOVACLOU</span>
            <p className="text-[11px] tracking-wider" style={{ color: "var(--nc-muted)" }}>© 2026 · Все изделия ручной сборки</p>
          </footer>
        </>
      )}

      {/* ===================== CART ===================== */}
      {step === "cart" && (
        <div className="min-h-screen pt-32 px-6 md:px-16 pb-20">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <h2 className="font-light" style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--nc-heading)" }}>
                Корзина
              </h2>
              <button
                onClick={() => setStep("catalog")}
                className="flex items-center gap-2 text-[11px] tracking-widest uppercase transition-colors duration-300"
                style={{ color: "var(--nc-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nc-heading)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nc-muted)")}
              >
                <Icon name="ArrowLeft" size={13} />
                Назад
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-2xl font-light mb-8" style={{ fontFamily: "Cormorant, serif", color: "var(--nc-muted)" }}>Корзина пуста</p>
                <button
                  onClick={() => setStep("catalog")}
                  className="text-[11px] tracking-widest uppercase px-8 py-3 transition-all duration-300"
                  style={{ border: "1px solid var(--nc-line)", color: "var(--nc-body)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--nc-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--nc-line)")}
                >
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col" style={{ borderTop: "1px solid var(--nc-line)" }}>
                  {cart.map((item) => {
                    const product = PRODUCTS.find((p) => p.id === item.id)!;
                    return (
                      <div key={item.id} className="flex items-center gap-6 py-8" style={{ borderBottom: "1px solid var(--nc-line)" }}>
                        <img src={product.image} alt={item.name} className="object-cover" style={{ width: 72, height: 72 }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xl font-light" style={{ fontFamily: "Cormorant, serif", color: "var(--nc-heading)" }}>{item.name}</p>
                          <p className="text-[11px] tracking-wider mt-1" style={{ color: "var(--nc-muted)" }}>{product.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center text-sm transition-colors"
                            style={{ border: "1px solid var(--nc-line)", color: "var(--nc-muted)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--nc-accent)")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--nc-line)")}
                          >−</button>
                          <span className="w-5 text-center text-sm" style={{ color: "var(--nc-body)" }}>{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center text-sm transition-colors"
                            style={{ border: "1px solid var(--nc-line)", color: "var(--nc-muted)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--nc-accent)")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--nc-line)")}
                          >+</button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium" style={{ color: "var(--nc-heading)" }}>{(item.price * item.qty).toLocaleString("ru-RU")} ₽</p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[10px] tracking-widest uppercase mt-1 transition-colors"
                            style={{ color: "var(--nc-line)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nc-muted)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nc-line)")}
                          >Удалить</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between pt-10">
                  <div>
                    <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--nc-muted)" }}>Итого</p>
                    <p className="font-light mt-1" style={{ fontFamily: "Cormorant, serif", fontSize: "2.5rem", color: "var(--nc-heading)" }}>
                      {total.toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                  <button
                    onClick={() => setStep("checkout")}
                    className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase px-8 py-4 transition-all duration-300"
                    style={{ background: "var(--nc-accent)", color: "#fff" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--nc-accent2)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "var(--nc-accent)")}
                  >
                    Оформить заказ
                    <Icon name="ArrowRight" size={13} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ===================== CHECKOUT ===================== */}
      {step === "checkout" && (
        <div className="min-h-screen pt-32 px-6 md:px-16 pb-20">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-16">
              <h2 className="font-light" style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--nc-heading)" }}>
                Оформление
              </h2>
              <button
                onClick={() => setStep("cart")}
                className="flex items-center gap-2 text-[11px] tracking-widest uppercase transition-colors duration-300"
                style={{ color: "var(--nc-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nc-heading)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nc-muted)")}
              >
                <Icon name="ArrowLeft" size={13} />
                Корзина
              </button>
            </div>

            <form onSubmit={handleOrder} className="flex flex-col gap-10">
              {[
                { key: "name", label: "Имя и фамилия", type: "text", placeholder: "Иван Иванов" },
                { key: "phone", label: "Телефон", type: "tel", placeholder: "+7 (___) ___-__-__" },
                { key: "address", label: "Адрес доставки", type: "text", placeholder: "Город, улица, дом, квартира" },
              ].map((field) => (
                <div key={field.key} className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "var(--nc-muted)" }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full bg-transparent text-sm outline-none py-3 transition-colors"
                    style={{ color: "var(--nc-heading)", borderBottom: "1px solid var(--nc-line)", fontFamily: "IBM Plex Sans, sans-serif" }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--nc-accent)")}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--nc-line)")}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "var(--nc-muted)" }}>
                  Комментарий
                </label>
                <textarea
                  rows={3}
                  placeholder="Пожелания к заказу..."
                  value={form.comment}
                  onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                  className="w-full bg-transparent text-sm outline-none resize-none py-3 transition-colors"
                  style={{ color: "var(--nc-heading)", borderBottom: "1px solid var(--nc-line)", fontFamily: "IBM Plex Sans, sans-serif" }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--nc-accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--nc-line)")}
                />
              </div>

              <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--nc-line)" }}>
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "var(--nc-muted)" }}>К оплате</p>
                  <p className="font-light mt-1" style={{ fontFamily: "Cormorant, serif", fontSize: "2rem", color: "var(--nc-heading)" }}>
                    {total.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase px-8 py-4 transition-all duration-300"
                  style={{ background: "var(--nc-accent)", color: "#fff" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--nc-accent2)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--nc-accent)")}
                >
                  Подтвердить
                  <Icon name="Check" size={13} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== SUCCESS ===================== */}
      {step === "success" && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <div className="w-14 h-14 flex items-center justify-center mb-10" style={{ border: "1px solid var(--nc-accent)" }}>
            <Icon name="Check" size={20} style={{ color: "var(--nc-accent)" }} />
          </div>
          <h2 className="font-light mb-4" style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--nc-heading)" }}>
            Заказ принят
          </h2>
          <p className="max-w-sm text-sm leading-relaxed mb-12" style={{ color: "var(--nc-muted)" }}>
            Мы свяжемся с вами в течение 24 часов для подтверждения и уточнения деталей доставки.
          </p>
          <button
            onClick={() => setStep("catalog")}
            className="text-[11px] tracking-[0.3em] uppercase px-8 py-3 transition-all duration-300"
            style={{ border: "1px solid var(--nc-line)", color: "var(--nc-body)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--nc-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--nc-line)")}
          >
            Вернуться в каталог
          </button>
        </div>
      )}

    </div>
  );
}

function ProductCard({
  product,
  onAdd,
  idx,
}: {
  product: (typeof PRODUCTS)[0];
  onAdd: (p: (typeof PRODUCTS)[0]) => void;
  idx: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col"
      style={{ animationDelay: `${idx * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4", background: "var(--nc-bg2)" }}>
        {product.tag && (
          <div
            className="absolute top-4 left-4 z-10 text-[9px] tracking-[0.3em] uppercase px-2 py-1"
            style={{ background: "var(--nc-accent)", color: "#fff" }}
          >
            {product.tag}
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
      </div>

      <div className="pt-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-light" style={{ fontFamily: "Cormorant, serif", color: "var(--nc-heading)" }}>
              {product.name}
            </h3>
            <p className="text-[11px] tracking-wider mt-0.5" style={{ color: "var(--nc-muted)" }}>
              {product.subtitle}
            </p>
          </div>
          <span className="text-sm font-light shrink-0 mt-0.5" style={{ color: "var(--nc-body)" }}>
            {product.price.toLocaleString("ru-RU")} ₽
          </span>
        </div>

        <p className="text-[10px] tracking-wider uppercase" style={{ color: "var(--nc-line)" }}>
          {product.material}
        </p>

        <button
          onClick={() => onAdd(product)}
          className="flex items-center justify-center gap-2 py-3 text-[10px] tracking-[0.3em] uppercase transition-all duration-300"
          style={{
            border: `1px solid ${hovered ? "var(--nc-accent)" : "var(--nc-line)"}`,
            color: hovered ? "var(--nc-bg)" : "var(--nc-body)",
            background: hovered ? "var(--nc-accent)" : "transparent",
          }}
        >
          <Icon name="Plus" size={11} />
          В корзину
        </button>
      </div>
    </div>
  );
}